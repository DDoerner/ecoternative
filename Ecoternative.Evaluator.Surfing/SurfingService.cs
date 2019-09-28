using Ecoternative.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Ecoternative.Evaluator.Surfing
{
    public class SurfingService : IAlternativeService
    {
        public string ServiceName => "Surfing";

        public async Task<ServiceResponseModel> EvaluateAsync(string request, IDictionary<string, string> data)
        {
            throw new NotImplementedException();
        }
    }
}
