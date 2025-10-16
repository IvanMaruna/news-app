using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Services;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/news")]
    public class NewsController(NewsScoreService newsScoreService) : ControllerBase
    {
        [HttpPost]
        public ActionResult<NewsResponse> Post(NewsRequest request)
        {
            var response = newsScoreService.CalculateScore(request.Measurements);

            return Ok(response);
        }
    }
}