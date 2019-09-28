using Ecoternative.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Ecoternative.Evaluator.Travel
{
    public class TravelService : IAlternativeService
    {
        public string ServiceName => "Travel";

        public async Task<ServiceResponseModel> EvaluateAsync(string request, IDictionary<string, string> data)
        {
            throw new NotImplementedException();
        }
    }
}
