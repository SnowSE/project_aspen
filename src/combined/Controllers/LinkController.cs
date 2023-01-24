namespace Api.Controllers;

[Route("api/link")]
[ApiController]
public class LinkController : ControllerBase
{

    [HttpGet]
    public IEnumerable<string> Get()
    {
        return new string[] { "value1", "value2" };
    }


    [HttpGet("{Event}")]
    public string Get(int id)
    {
        return "value";
    }

}

