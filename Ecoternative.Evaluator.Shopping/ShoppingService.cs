using Ecoternative.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ecoternative.Evaluator.Shopping
{
    public class ShoppingService : IAlternativeService
    {
        public string ServiceName => "Shopping";

        public ServiceResponseModel Evaluate(string request, IDictionary<string, string> data)
        {
            throw new NotImplementedException();
        }
    }
}
