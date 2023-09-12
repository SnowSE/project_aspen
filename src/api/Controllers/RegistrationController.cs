
namespace Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RegistrationController : ControllerBase
{
    private readonly IPersonRepository personRepository;
    private readonly ILogger<RegistrationController> log;

    private IRegistrationRepository registrationRepository { get; }
    public IMapper mapper { get; }
    private string getModelStateErrorMessage() =>
        string.Join(" | ",
            ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
            );

    public RegistrationController(IRegistrationRepository registrationRepository, IPersonRepository personRepository, IMapper mapper, ILogger<RegistrationController> log)
    {
        this.registrationRepository = registrationRepository;
        this.personRepository = personRepository;
        this.mapper = mapper;
        this.log = log;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<DtoRegistration>> GetByID(long id)
    {
        log.LogInformation("Getting Registration {id}", id);
        if (!await registrationRepository.ExistsAsync(id))
            return NotFound("Registration id does not exist");

        var registration = await registrationRepository.GetByIdAsync(id);
        return mapper.Map<DtoRegistration>(registration);

    }

    [HttpPost]
    public async Task<ActionResult<DtoRegistration>> Add([FromBody] DtoRegistration dtoRegistration)
    {
        log.LogInformation("Adding new dtoRegistration {dtoRegistration}", dtoRegistration);
        if (!ModelState.IsValid)
            return BadRequest(getModelStateErrorMessage());

        if (dtoRegistration.ID != 0)
            return BadRequest("Cannot add with a valid id");

        var registrationToAdd = mapper.Map<Registration>(dtoRegistration);
        var updatedRegistration = await registrationRepository.AddAsync(registrationToAdd);
        return mapper.Map<DtoRegistration>(updatedRegistration);
    }

    [HttpPost("link/{registrationId}/{personId}")]
    public async Task<ActionResult<DtoRegistration>> LinkPersonRegistration(long registrationId, long personId)
    {
        log.LogInformation("Linking registration {registrationId} to person {personId}", registrationId, personId);
        var registration = await registrationRepository.GetByIdAsync(registrationId);
        if (registration == null)
            return NotFound("Invalid registration id");

        var person = await personRepository.GetByIDAsync(personId);
        if (person == null)
            return NotFound("Invalid person id");

        var updatedRegistration = await registrationRepository.LinkPersonToRegistrationAsync(registrationId, personId);
        return mapper.Map<DtoRegistration>(updatedRegistration);
    }

    [HttpPut]
    public async Task<ActionResult<DtoRegistration>> Edit([FromBody] DtoRegistration dtoRegistration)
    {
        log.LogInformation("Editing dtoRegistration {dtoRegstration}", dtoRegistration);
        if (!ModelState.IsValid)
            return BadRequest(getModelStateErrorMessage());

        if (!await registrationRepository.ExistsAsync(dtoRegistration.ID))
            return NotFound("Registration id does not exist");

        var registrationToEdit = mapper.Map<Registration>(dtoRegistration);
        var editedRegistration = await registrationRepository.EditAsync(registrationToEdit);
        return mapper.Map<DtoRegistration>(editedRegistration);
    }

    [HttpDelete("{id}"), Authorize(Roles = AdminController.AspenAdminRole)]
    public async Task<IActionResult> Delete(long id)
    {
        log.LogInformation("Deleting registration {id}", id);
        if (!await registrationRepository.ExistsAsync(id))
            return NotFound("Registration id does not exist");

        await registrationRepository.DeleteAsync(id);
        return Ok();
    }
}
