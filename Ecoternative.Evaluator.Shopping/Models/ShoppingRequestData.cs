using Ecoternative.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ecoternative.Evaluator.Shopping.Models
{
    public class ShoppingRequestData : RequestDataParser
    {
        public double Lng { get; set; }
        public double Lat { get; set; }

        public ShoppingRequestData(IDictionary<string, string> data) : base(data)
        {
            Lng = ParseDouble("lng");
            Lat = ParseDouble("lat");
        }
    }
}
