using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Ecoternative.Core.Models
{
    public interface IAlternativeService
    {
        string ServiceName { get; }
        Task<ServiceResponseModel> EvaluateAsync(string request, IDictionary<string, string> data);
    }
}
