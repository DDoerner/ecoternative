using Ecoternative.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ecoternative.Evaluator.Surfing
{
    public class SurfingService : IAlternativeService
    {
        public string ServiceName => "Surfing";

        public ServiceResponseModel Evaluate(string request, IDictionary<string, string> data)
        {
            throw new NotImplementedException();
        }
    }
}
