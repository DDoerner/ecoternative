using System;
using System.Collections.Generic;
using System.Text;

namespace Ecoternative.Core
{
    public class AppConfiguration
    {
        public static AppConfiguration CurrentConfiguration;

        public string Tomtom_ApiKey { get; set; }

        public string Google_ApiKey { get; set; }
    }
}
