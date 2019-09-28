using Ecoternative.Core.Models;
using Ecoternative.Evaluator.Shopping;
using Ecoternative.Evaluator.Surfing;
using Ecoternative.Evaluator.Travel;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Ecoternative.Evaluator
{
    public class EvaluatorService
    {
        public async Task<AlternativeResponseModel> EvaluateAsync(AlternativeRequestModel request)
        {
            var system = ChooseService(request.System);

            ServiceResponseModel result;
            try
            {
                result = await system.EvaluateAsync(request.Request, request.Request_data).ConfigureAwait(false);
            }
            catch (ArgumentException)
            {
                throw;
            }
            catch (Exception)
            {
                result = new ServiceResponseModel();
            }

            return new AlternativeResponseModel()
            {
                System = request.System,
                Request = request.Request,
                Alternative_found = result.Alternative_found,
                Alternative_url = result.Alternative_url,
                Alternative_saving = result.Alternative_saving,
                Alternative_data = result.Alternative_data
            };
        }

        public async Task<EnvScoreResponseModel> GetCompanyScore(string company)
        {
            var service = new SurfingService();
            try
            {
                var result = await service.EvaluateAsync(company);
                return result;
            }
            catch (ArgumentException)
            {
                throw;
            }
            catch (Exception)
            {
                return new EnvScoreResponseModel();
            }
        }

        private IAlternativeService ChooseService(string system)
        {
            switch (system.ToLower())
            {
                case "demo": return new DemoService();
                case "shopping": return new ShoppingService();
                case "travel": return new TravelService();
                default: throw new ArgumentException("The given subsystem is not valid");
            }
        }

        private class DemoService : IAlternativeService
        {
            public string ServiceName => "Demo";

            public async Task<ServiceResponseModel> EvaluateAsync(string request, IDictionary<string, string> data)
            {
                return new ServiceResponseModel()
                {
                    Alternative_found = true,
                    Alternative_url = "https://www.saturn.de/de/product/_philips-pt860-16-powertouch-plus-1446560.html?rbtc=ide%7Cpf%7C1446560%7C%7Cp%7C%7C",
                    Alternative_saving = 3,
                    Alternative_data = new Dictionary<string, string>
                    {
                        { "distance", "450" },
                        { "type", "local" },
                        { "method", "walking" },
                        { "address", "Kaiserstrasse 146-148 Am Europaplatz, 76133 Karlsruhe, Germany" },
                        { "lat", "49.010144" },
                        { "lng", "8.394881" }
                    }
                };
            }
        }
    }
}
