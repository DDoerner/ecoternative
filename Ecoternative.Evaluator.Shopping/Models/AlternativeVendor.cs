using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace Ecoternative.Evaluator.Shopping.Models
{
    internal sealed class AlternativeVendor
    {
        public static AlternativeVendor Saturn = new AlternativeVendor("Saturn", "drrdz.png");
        public static AlternativeVendor Penny = new AlternativeVendor("Penny", "fufdf.png");
        public static AlternativeVendor Decathlon = new AlternativeVendor("Decathlon", "rkxrr.png");
        public static AlternativeVendor MediaMarkt = new AlternativeVendor("Media Markt", "drdgd.png");

        public string Name { get; }
        public string Id { get; }

        private AlternativeVendor(string name, string id)
        {
            Name = name;
            Id = id;
        }

        public static IEnumerable<AlternativeVendor> Values()
        {
            yield return Saturn;
            yield return Penny;
            yield return Decathlon;
            yield return MediaMarkt;
        }
    }
}
