using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecoternative.Api.Models;
using Ecoternative.Core.Models;
using Ecoternative.Evaluator;
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
            return new Evaluator().Evaluate(model);
        }
    }
}
