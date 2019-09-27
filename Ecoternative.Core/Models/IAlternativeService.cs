using System;
using System.Collections.Generic;
using System.Text;

namespace Ecoternative.Core.Models
{
    public interface IAlternativeService
    {
        string ServiceName { get; }
        ServiceResponseModel Evaluate(string request, IDictionary<string, string> data);
    }
}
