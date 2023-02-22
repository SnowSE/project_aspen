
using Api.DataAccess;

namespace Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PersonTeamAssociationController : ControllerBase
{
    private readonly IPersonTeamAssoicationRepository personTeamAssociationRepository;
    private readonly ITeamRepository teamRepository;
    private readonly IMapper mapper;
    private readonly ILogger<PersonTeamAssociationController> log;

    public PersonTeamAssociationController(IPersonTeamAssoicationRepository personTeamAssociationRepository, ITeamRepository teamRepository, IMapper mapper, ILogger<PersonTeamAssociationController> log)
    {
        this.mapper = mapper;
        this.log = log;
        this.personTeamAssociationRepository = personTeamAssociationRepository;  
    }

    [HttpGet("{personId}/{eventId}")]
    public async Task<ActionResult<DtoTeam>> GetTeamAsync(long personId, long eventId)
    {
        if (!await personTeamAssociationRepository.ExistsAsync(personId, eventId))
            return NotFound("Person does not belong to a team in this event");

        var team = await personTeamAssociationRepository.GetTeamAsync(personId, eventId);
        return mapper.Map<DtoTeam>(team);
    }

    [HttpPost()]
    public async Task<ActionResult<DtoPersonTeamAssociation>> Add([FromBody] DtoPersonTeamAssociation dtoPersonTeamAssociation){

        var tempPersonTeam = mapper.Map<PersonTeamAssociation>(dtoPersonTeamAssociation);
        var newPersonTeamAssociation = await personTeamAssociationRepository.AddAsync(tempPersonTeam);
        return mapper.Map<DtoPersonTeamAssociation>(newPersonTeamAssociation);
    }

    [HttpGet("team/{teamId}")]
    public async Task<ActionResult<List<DtoPerson>>> GetTeamMembersAsync(long teamId)
    {

        var teamMembers = await personTeamAssociationRepository.GetTeamMembersAsync(teamId);
        return mapper.Map<List<DtoPerson>>(teamMembers);
    }

}
