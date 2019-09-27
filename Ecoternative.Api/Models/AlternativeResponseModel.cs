using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ecoternative.Api.Models
{
    public class AlternativeResponseModel
    {
        /// <summary>
        /// Repeated subsystem from the original request
        /// </summary>
        public string System { get; set; }
        /// <summary>
        /// Repeated request string from the original request
        /// </summary>
        public string Request { get; set; }
        /// <summary>
        /// Marks whether an alternative has been found successfully
        /// </summary>
        public bool Alternative_found { get; set; }
        /// <summary>
        /// URL leading to more information about the alternative
        /// </summary>
        public string Alternative_url { get; set; }
        /// <summary>
        /// Measures how much CO2 will be saved by using the alternative
        /// </summary>
        public decimal Alternative_saving { get; set; }
        /// <summary>
        /// Additional data that depends on the selected subsystem
        /// </summary>
        public IDictionary<string, string> Alternative_data { get; set; }
    }
}
