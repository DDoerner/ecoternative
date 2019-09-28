using Ecoternative.Core.Models;
using Microsoft.Data.Sqlite;
using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Ecoternative.Evaluator.Surfing
{
    public class SurfingService
    {
        public string ServiceName => "Surfing";

        public async Task<EnvScoreResponseModel> EvaluateAsync(string request)
        {
            // Prepare request
            var regex = $"^((https?)://)?(www.)?([\\w\\d]+\\.)*([\\w\\d]+)\\.[\\w\\d]+";
            request = Regex.Match(request, regex).Groups[4].Value;

            // Locate database
            string currentPath = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            var connectionStringBuilder = new SqliteConnectionStringBuilder
            {
                DataSource = Path.Combine(currentPath, "Data/hack_train.db")
            };

            // Operate on db
            using (var connection = new SqliteConnection("" + connectionStringBuilder))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = $"SELECT (env_supply_chain_rating + env_production_rating + env_products_rating) / 3 as env_rating, company FROM rated WHERE LOWER(company) LIKE '%{request.ToLower().Replace('\'', '`')}%';";

                // Process results
                using (var reader = command.ExecuteReader())
                {
                    while (await reader.ReadAsync())
                    {
                        var message = reader.GetString(0);
                        return new EnvScoreResponseModel()
                        {
                            Company = reader.GetString(1),
                            Env_score_known = true,
                            Env_score = reader.GetString(0)
                        };
                    }
                    return new EnvScoreResponseModel();
                }
            }
        }
    }
}
