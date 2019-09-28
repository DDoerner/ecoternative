using Ecoternative.Core;
using Ecoternative.Core.Models;
using Ecoternative.Evaluator.Shopping.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace Ecoternative.Evaluator.Shopping
{
    public class ShoppingService : IAlternativeService
    {
        public string ServiceName => "Shopping";
        public string TomtomApiKey;

        public ShoppingService()
        {
            TomtomApiKey = AppConfiguration.CurrentConfiguration.Tomtom_ApiKey;
        }

        public async Task<ServiceResponseModel> EvaluateAsync(string request, IDictionary<string, string> data)
        {
            Thread.CurrentThread.CurrentCulture = CultureInfo.InvariantCulture;

            var requestData = new ShoppingRequestData(data);
            var productUrl = await FindProductUrlAsync(request);
            var vendors = await FindAlternativeVendorsAsync(productUrl);
            var responseData = await FindClosestStoreLocationAsync(vendors, requestData);
            var saving = await CalculateSavingAsync(responseData);

            return new ServiceResponseModel()
            {
                Alternative_found = true,
                Alternative_saving = saving,
                Alternative_url = responseData.LocationUrl,
                Alternative_data = responseData.ToDictionary()
            };
        }

        private async Task<string> FindProductUrlAsync(string product)
        {
            //return "https://www.guenstiger.de/Produkt/SanDisk/Ultra_microSDHC_UHS_I_32GB_SDSQUAR_032G_GN6MA.html";
            var encodedProduct = HttpUtility.UrlEncode(product.Replace(' ', '_'));
            var url = $"https://www.guenstiger.de/Katalog/Preis.pl?sucheall={encodedProduct}";

            string sourceCode;
            using (var handler = new HttpClientHandler()
            {
                AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate,
                AllowAutoRedirect = true
            })
            {
                using (var client = new HttpClient(handler))
                {
                    using (var response = await client.GetAsync(url))
                    {
                        using (var content = response.Content)
                        {
                            sourceCode = await content.ReadAsStringAsync();
                        }
                    }
                }
            }

            const string regex = "<a\\s+class=\"stopBubbling\"\\s+href=\"([^\"]+)\"\\s+title=";
            var match = Regex.Match(sourceCode, regex);
            if (!match.Success)
                throw new AlternativeNotFoundException();

            return "https://www.guenstiger.de" + match.Groups[1].Value;
        }

        private async Task<IEnumerable<AlternativeVendor>> FindAlternativeVendorsAsync(string productUrl)
        {
            //return new List<AlternativeVendor>() { AlternativeVendor.Saturn, AlternativeVendor.Decathlon };
            string sourceCode;
            using (var handler = new HttpClientHandler()
            {
                AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate,
                AllowAutoRedirect = true
            })
            {
                using (var client = new HttpClient(handler))
                {
                    using (var response = await client.GetAsync(productUrl))
                    {
                        using (var content = response.Content)
                        {
                            sourceCode = await content.ReadAsStringAsync();
                        }
                    }
                }
            }

            var list = new List<AlternativeVendor>();
            foreach (var vendor in AlternativeVendor.Values())
            {
                var regex = "<div class=\"OFFERLOGO\" ><img  src=\"/haendlerlogo/" + vendor.Id;
                var match = Regex.Match(sourceCode, regex);
                if (match.Success)
                    list.Add(vendor);
            }
            return list;
        }

        private Task<TomTomResult> FindClosestStoreLocationAsync(IEnumerable<AlternativeVendor> vendors, ShoppingRequestData data)
        {
            TomTomResult bestResult = null;
            foreach (var vendor in vendors)
            {
                // Call TomTom API
                var baseUrl = $"https://api.tomtom.com/search/2/search/{vendor.Name}.json?key={TomtomApiKey}";
                var parameters = new Dictionary<string, string>()
                {
                    { "typeahead", "false" },
                    { "countrySet", "DE" },
                    { "lat", data.Lat.ToString() },
                    { "lon", data.Lng.ToString() },
                    { "radius", "3000" },
                    { "idxSet", "POI" }
                };
                var url = baseUrl + "&" + string.Join('&', parameters.Select(pair => $"{pair.Key}={pair.Value}"));

                // Get response
                var client = new RestClient(url);
                var response = client.Execute(new RestRequest());
                dynamic result = JsonConvert.DeserializeObject(response.Content);

                // Process response
                if (result.summary.numResults == 0)
                    continue;
                var closest = result.results[0];
                var distance = double.Parse(closest.dist.ToString());
                if (bestResult != null && distance > bestResult.Distance)
                    continue;

                // prepare result
                bestResult = new TomTomResult()
                {
                    Distance = distance,
                    Address = closest.address.streetName + " " + closest.address.streetNumber + ", " + closest.address.municipality,
                    Vendor = closest.poi.name,
                    Lat = closest.position.lat,
                    Lng = closest.position.lon,
                    Method = distance < 600 ? "Walking" : "Biking",
                    LocationUrl = $"https://www.google.com/maps/search/?api=1&query={closest.position.lat},{closest.position.lon}"
                };
            }

            if (bestResult == null)
                throw new AlternativeNotFoundException();

            return Task.FromResult(bestResult);
        }

        private Task<double> CalculateSavingAsync(TomTomResult responseData)
        {
            var saving = responseData.Distance / 1000.0 * 0.270;
            return Task.FromResult(saving);
        }

        private class TomTomResult
        {
            public double Distance { get; set; }
            public string Address { get; set; }
            public string Vendor { get; set; }
            public string Method { get; set; }
            public string Type => "Local";
            public string Lat { get; set; }
            public string Lng { get; set; }
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
