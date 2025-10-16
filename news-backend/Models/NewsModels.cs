namespace Backend.Models
{
    public class Measurement
    {
        public string Type { get; set; }
        public decimal Value { get; set; }
    }

    public class NewsRequest
    {
        public List<Measurement> Measurements { get; set; }
    }

    public class NewsResponse
    {
        public int? Score { get; set; }
        public Dictionary<string, string> Errors { get; set; }
    }
}