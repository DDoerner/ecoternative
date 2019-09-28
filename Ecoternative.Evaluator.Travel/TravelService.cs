using Ecoternative.Core;
using Ecoternative.Core.Models;
using Ecoternative.Evaluator.Travel.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Ecoternative.Evaluator.Travel
{
    public class TravelService : IAlternativeService
    {
        public string ServiceName => "Travel";
        public string GoogleApiKey;

        public TravelService()
        {
            GoogleApiKey = AppConfiguration.CurrentConfiguration.Google_ApiKey;
        }

        public async Task<ServiceResponseModel> EvaluateAsync(string request, IDictionary<string, string> data)
        {
            var requestData = new TravelRequestData(data);
            var flightRoute = await FindFlightRouteAsync(requestData);
            var transitRoute = await FindTransitAlternativeAsync(requestData);
            var saving = await CalculateSavingAsync(transitRoute, flightRoute);

            transitRoute.Original_time = flightRoute.Original_time + 2;
            return new ServiceResponseModel()
            {
                Alternative_found = true,
                Alternative_saving = saving,
                Alternative_url = transitRoute.LocationUrl,
                Alternative_data = transitRoute.ToDictionary()
            };
        }

        private Task<MapsResult> FindFlightRouteAsync(TravelRequestData data)
        {
            // Setup Flight Calculator Crawling
            var baseUrl = $"https://www.travelmath.com/flying-time";
            var parameters = new Dictionary<string, string>()
                {
                    { "from", data.From },
                    { "to", data.To }
                };
            var url = baseUrl + "/" + string.Join('/', parameters.Select(pair => $"{pair.Key}/{pair.Value}"));

            // Get response
            var client = new RestClient(url);
            var response = client.Execute(new RestRequest());
            var sourceCode = response.Content;

            // Find flight time
            const string regex = "<h3 class=\"space\" id=\"flyingtime\">((\\d+) hours?, )?(\\d+) minutes?</h3>";
            var match = Regex.Match(sourceCode, regex);
            var hours = int.Parse(string.IsNullOrEmpty(match.Groups[2].Value) ? "0" : match.Groups[2].Value);
            var minutes = int.Parse(match.Groups[3].Value);
            var time = new TimeSpan(hours, minutes, 0) + new TimeSpan(0, 40, 0);

            var result = new MapsResult()
            {
                Original_time = time.Hours + (time.Minutes / 60.0),
                Departure = data.From,
                Destination = data.To,
                LocationUrl = null,
                Method = "Flight"
            };
            return Task.FromResult(result);
        }

        private Task<MapsResult> FindTransitAlternativeAsync(TravelRequestData data)
        {
            // Call Google API
            var baseUrl = $"https://maps.googleapis.com/maps/api/directions/json?key={GoogleApiKey}";
            var parameters = new Dictionary<string, string>()
                {
                    { "origin", data.From },
                    { "destination", data.To },
                    { "departure_time", "now" },
                    //{ "departure_time", ((DateTimeOffset)data.Date.AddHours(9)).ToUnixTimeSeconds().ToString() },
                    { "mode", "transit" }
                };
            var url = baseUrl + "&" + string.Join('&', parameters.Select(pair => $"{pair.Key}={pair.Value}"));

            // Get response
            var client = new RestClient(url);
            var response = client.Execute(new RestRequest());
            dynamic result = JsonConvert.DeserializeObject(response.Content);

            // Parse response
            if (result.status != "OK" || result.routes.Count == 0)
                throw new AlternativeNotFoundException();
            MapsResult bestResult = null;
            foreach (var route in result.routes)
            {
                var leg = route.legs[0];
                var time = leg.duration.value / 3600.0;
                if (bestResult != null && time > bestResult.Travel_time)
                    continue;

                // Prepare result
                bestResult = new MapsResult()
                {
                    Travel_time = time,
                    Departure = leg.start_address,
                    Destination = leg.end_address,
                    Method = "Transit",
                    LocationUrl = $"https://www.google.com/maps/dir/{leg.start_address}/{leg.end_address}/"
                };
            }

            if (bestResult == null)
                throw new AlternativeNotFoundException();

            return Task.FromResult(bestResult);
        }

        private Task<double> CalculateSavingAsync(MapsResult transitData, MapsResult flightData)
        {
            var flightEmissions = flightData.Original_time * 200.0;
            var transitEmissions = flightEmissions * 0.15;
            return Task.FromResult(flightEmissions - transitEmissions);
        }

        private class MapsResult
        {
            public double Travel_time { get; set; }
            public double Original_time { get; set; }
            public string Method { get; set; }
            public string Departure { get; set; }
            public string Destination { get; set; }
            public string LocationUrl { get; set; }

            public IDictionary<string, string> ToDictionary()
            {
                var settings = new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                };
                return JsonConvert.DeserializeObject<IDictionary<string, string>>(JsonConvert.SerializeObject(this, settings));
            }
        }

    }
}
