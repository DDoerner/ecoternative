using System;
using System.Collections.Generic;
using System.Text;

namespace Ecoternative.Core
{
    public class AlternativeNotFoundException : Exception
    {
        public AlternativeNotFoundException() : base() { }
        public AlternativeNotFoundException(string message) : base(message) { }
        public AlternativeNotFoundException(string message, Exception inner) : base(message, inner) { }
    }
}
