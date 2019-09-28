using System;
using System.Collections.Generic;
using System.Text;

namespace Ecoternative.Core.Models
{
    public class ServiceResponseModel
    {
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
        public double Alternative_saving { get; set; }
        /// <summary>
        /// Additional data that depends on the selected subsystem
        /// </summary>
        public IDictionary<string, string> Alternative_data { get; set; }
    }
}
