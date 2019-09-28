using Ecoternative.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ecoternative.Evaluator.Travel.Models
{
    public class TravelRequestData : RequestDataParser
    {
        public string Type { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public DateTime Date { get; set; }
        public DateTime? DateBack { get; set; }

        public TravelRequestData(IDictionary<string, string> data) : base(data)
        {
            Type = ParseString("type");
            From = ParseString("from");
            To = ParseString("to");
            Date = ParseDateTime("date");
            DateBack = data["date_back"] == null
                ? null as DateTime?
                : ParseDateTime("date_back");
        }
    }
}
