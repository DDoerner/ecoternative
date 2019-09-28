using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecoternative.Core.Models;
using Ecoternative.Evaluator;
using Microsoft.AspNetCore.Mvc;

namespace Ecoternative.Api.Controllers
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
        public async Task<ActionResult<AlternativeResponseModel>> FindAlternativeAsync(AlternativeRequestModel model)
        {
            return await new EvaluatorService().EvaluateAsync(model).ConfigureAwait(false);
        }
        
        [Route("Score")]
        [HttpGet]
        [Produces("application/json")]
        public async Task<ActionResult<EnvScoreResponseModel>> GetCompanyEnvironmentScore(string company)
        {
            return await new EvaluatorService().GetCompanyScore(company);
        }
    }
}
