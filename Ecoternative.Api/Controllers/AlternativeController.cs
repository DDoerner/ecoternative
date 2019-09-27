using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecoternative.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace Test.Controllers
{
    [Route("")]
    [ApiController]
    public class AlternativeController : ControllerBase
    {
        /// <summary>
        /// Requests an eco-friendly alternative to a specified request 
        /// </summary>
        /// <param name="model">Request parameters</param>
        /// <returns>Response object about the found alternative</returns>
        [HttpPost]
        [Produces("application/json")]
        public ActionResult<AlternativeResponseModel> FindAlternative(AlternativeRequestModel model)
        {
            return new AlternativeResponseModel()
            {
                System = EcoSystem.Shopping.ToString(),
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
        }
    }
}
