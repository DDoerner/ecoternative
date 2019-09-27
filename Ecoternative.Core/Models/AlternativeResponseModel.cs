using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ecoternative.Core.Models
{
    public class AlternativeResponseModel : ServiceResponseModel
    {
        /// <summary>
        /// Repeated subsystem from the original request
        /// </summary>
        public string System { get; set; }
        /// <summary>
        /// Repeated request string from the original request
        /// </summary>
        public string Request { get; set; }
    }
}
