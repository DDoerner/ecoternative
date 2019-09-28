using System;
using System.Collections.Generic;
using System.Text;

namespace Ecoternative.Core.Models
{
    public class EnvScoreResponseModel
    {
        public string Company { get; set; }
        public bool Env_score_known { get; set; }
        public string Env_score { get; set; }
    }
}
