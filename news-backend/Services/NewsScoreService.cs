using Backend.Models;

namespace Backend.Services
{
    public class NewsScoreService
    {
        private record RangeScore(int Min, int Max, int Score);

        private record MeasurementRange(
            string Type,
            List<RangeScore> Ranges,
            int ValidMin,
            int ValidMax
        );

        private static readonly List<MeasurementRange> MeasurementRanges = new()
        {
            new MeasurementRange(
                "TEMP",
                new List<RangeScore>
                {
                    new RangeScore(31, 35, 3),
                    new RangeScore(35, 36, 1),
                    new RangeScore(36, 38, 0),
                    new RangeScore(38, 39, 1),
                    new RangeScore(39, 42, 2)
                },
                31, 42
            ),
            new MeasurementRange(
                "HR",
                new List<RangeScore>
                {
                    new RangeScore(25, 40, 3),
                    new RangeScore(40, 50, 1),
                    new RangeScore(50, 90, 0),
                    new RangeScore(90, 110, 1),
                    new RangeScore(110, 130, 2),
                    new RangeScore(130, 220, 3)
                },
                25, 220
            ),
            new MeasurementRange(
                "RR",
                new List<RangeScore>
                {
                    new RangeScore(3, 8, 3),
                    new RangeScore(8, 11, 1),
                    new RangeScore(11, 20, 0),
                    new RangeScore(20, 24, 2),
                    new RangeScore(24, 60, 3)
                },
                3, 60
            )
        };

        private static string ToDisplayLabel(string type)
        {
            return type switch
            {
                "TEMP" => "Temperature",
                "HR" => "Heart rate",
                "RR" => "Respiratory rate",
                _ => type
            };
        }

        public NewsResponse CalculateScore(List<Measurement> measurements)
        {
            int totalScore = 0;
            var errors = new Dictionary<string, string>();            

            foreach (var measurement in measurements)
            {
                var measurementRange = MeasurementRanges.First(r => r.Type == measurement.Type);
                if (!(measurement.Value > measurementRange.ValidMin && measurement.Value <= measurementRange.ValidMax))
                {
                    string field = measurement.Type.ToLower();
                    errors[field] = $"{ToDisplayLabel(measurement.Type)} must be between {measurementRange.ValidMin} and {measurementRange.ValidMax}";
                    continue;
                }
                var score = measurementRange.Ranges
                    .Where(r => measurement.Value > r.Min && measurement.Value <= r.Max)
                    .Select(r => r.Score)
                    .First();
                totalScore += score;
            }

            return new NewsResponse { Score = errors.Count > 0 ? null : totalScore, Errors = errors };
        }
    }
}