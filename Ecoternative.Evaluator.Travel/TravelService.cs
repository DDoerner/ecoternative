using Ecoternative.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ecoternative.Evaluator.Travel
{
    public class TravelService : IAlternativeService
    {
        public string ServiceName => "Travel";

        public ServiceResponseModel Evaluate(string request, IDictionary<string, string> data)
        {
            throw new NotImplementedException();
        }
    }
}
