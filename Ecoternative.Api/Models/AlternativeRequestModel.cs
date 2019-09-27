using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ecoternative.Api.Models
{
    public class AlternativeRequestModel
    {
        /// <summary>
        /// Selection of the subsystem to be used
        /// </summary>
        public EcoSystem System { get; set; }
        /// <summary>
        /// Request string
        /// </summary>
        public string Request { get; set; }
        /// <summary>
        /// Additional data that depends on the selected subsystem
        /// </summary>
        public IDictionary<string, string> Request_data { get; set; }
    }
}
