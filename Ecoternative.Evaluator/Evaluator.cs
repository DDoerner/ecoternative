using Ecoternative.Core.Models;
using Ecoternative.Evaluator.Shopping;
using Ecoternative.Evaluator.Surfing;
using Ecoternative.Evaluator.Travel;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ecoternative.Evaluator
{
    public class Evaluator
    {
        public AlternativeResponseModel Evaluate(AlternativeRequestModel request)
        {
            var system = ChooseService(request.System);

            // Intercept for debugging purposes
            return new AlternativeResponseModel()
            {
                System = "Shopping",
                Request = "Philips Elektrischer Trockenrasierer PowerTouch mit DualPrecision-Klingen PT860/16, Präzisionstrimmer",
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

            ServiceResponseModel result;
            try
            {
                result = system.Evaluate(request.Request, request.Request_data);
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

        public IAlternativeService ChooseService(string system)
        {
            switch (system)
            {
                case "Shopping": return new ShoppingService();
                case "Travel": return new TravelService();
                case "Surfing": return new SurfingService();
                default: throw new ArgumentException("The given subsystem is not valid");
            }
        }
    }
}
