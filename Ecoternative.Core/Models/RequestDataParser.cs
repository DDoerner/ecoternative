using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;

namespace Ecoternative.Core.Models
{
    public class RequestDataParser
    {
        protected IDictionary<string, string> Data { get; }

        public RequestDataParser(IDictionary<string, string> data)
        {
            Data = data;
        }

        protected int ParseInt(string key)
        {
            var val = GetValueOrThrowException(key);
            try
            {
                return int.Parse(val);
            }
            catch (FormatException)
            {
                throw new ArgumentException("Request data has an invalid format: " + key);
            }
        }

        protected double ParseDouble(string key)
        {
            var val = GetValueOrThrowException(key);
            try
            {
                return double.Parse(val);
            }
            catch (FormatException)
            {
                throw new ArgumentException("Request data has an invalid format: " + key);
            }
        }

        protected bool ParseBool(string key)
        {
            var val = GetValueOrThrowException(key);
            try
            {
                return bool.Parse(val);
            }
            catch (FormatException)
            {
                throw new ArgumentException("Request data has an invalid format: " + key);
            }
        }

        protected string ParseString(string key)
        {
            var val = GetValueOrThrowException(key);
            return val;
        }

        private string GetValueOrThrowException(string key)
        {
            if (!Data.ContainsKey(key))
                throw new ArgumentException("Necessary data is missing in the request options: " + key);
            return Data[key];
        }
    }
}
