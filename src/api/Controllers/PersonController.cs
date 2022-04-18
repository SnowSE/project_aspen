namespace Api.Controllers;
using Microsoft.Extensions.Logging;
[Route("api/[controller]")]
[ApiController]
public class PersonController : ControllerBase
{
    private readonly IPersonRepository personRepository;
    private readonly IRegistrationRepository registrationRepository;
    private readonly IMapper mapper;
    private readonly ILogger<PersonController> logger;

    private string getModelStateErrorMessage() =>
        string.Join(" | ",
            ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
            );

    public PersonController(IPersonRepository personRepository, IRegistrationRepository registrationRepository, IMapper mapper, ILogger<PersonController> logger)
    {
        this.personRepository = personRepository;
        this.registrationRepository = registrationRepository;
        this.mapper = mapper;
        this.logger = logger;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<DtoPerson>> GetByID(long id)
    {
        if (!await personRepository.ExistsAsync(id))
            logger.LogError($"Person id does not exist: {id}");
            return NotFound("Person id does not exist");
        var person = await personRepository.GetByIDAsync(id);
        logger.LogInformation($"Getting person by id: {person.ID}");
        return mapper.Map<DtoPerson>(person);
    }

    [HttpGet("authid/{authId}")]
    public async Task<ActionResult<DtoPerson>> GetByAuthId(string authId)
    {
        var person = await personRepository.GetByAuthIdAsync(authId);
        if (person == null)
            logger.LogError($"Person authId does not exist: {authId}");
            return NotFound("AuthID does not exist");
        logger.LogInformation($"Getting person by authId: {person.ID}");
        return mapper.Map<DtoPerson>(person);
    }

    [HttpPost]
    public async Task<ActionResult<DtoPerson>> Add([FromBody] DtoPerson dtoPerson)
    {
        if (!ModelState.IsValid)
            logger.LogError($"ModelState is not valid: {getModelStateErrorMessage()}");
            return BadRequest(getModelStateErrorMessage());

        if (dtoPerson.ID != 0)
            logger.LogError($"Cannot add with a valid id: {dtoPerson.ID}");
            return BadRequest("Cannot add with a valid id");

        if (string.IsNullOrEmpty(dtoPerson.AuthID))
        {
            var person = await personRepository.AddAsync(dtoPerson.Name, dtoPerson.Bio);
            logger.LogInformation($"Adding person: {person.ID}");
            return mapper.Map<DtoPerson>(person);
        }
        else
        {
            var person = await personRepository.AddAsync(dtoPerson.Name, dtoPerson.Bio, dtoPerson.AuthID);
            logger.LogInformation($"Person already exists person: {person.ID}");
            return mapper.Map<DtoPerson>(person);
        }
    }

    [HttpPut()]
    public async Task<ActionResult<DtoPerson>> Edit([FromBody] DtoPerson dtoPerson)
    {
        if (!ModelState.IsValid)
            return BadRequest(getModelStateErrorMessage());
        if (!await personRepository.ExistsAsync(dtoPerson.ID))
            logger.LogError($"Person id does not exist: {dtoPerson.ID}");
            return NotFound("Person id does not exist");

        var person = mapper.Map<Person>(dtoPerson);
        var updatedPerson = await personRepository.EditAsync(person);

        logger.LogInformation($"Editing person: {updatedPerson.ID}");
        return mapper.Map<DtoPerson>(updatedPerson);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(long id)
    {
        if (!await personRepository.ExistsAsync(id))
            return NotFound("Person id does not exist");

        await personRepository.DeleteAsync(id);
        logger.LogInformation($"Deleting person: {id}");
        return Ok();
    }

    [HttpGet("{id}/registrations")]
    public async Task<IEnumerable<DtoRegistration>> GetRegistrationsByID(long id)
    {
        if (await personRepository.ExistsAsync(id) is false)
            logger.LogError($"Person id does not exist: {id}");
            throw new NotFoundException<IEnumerable<DtoRegistration>>("Person id does not exist");

        var registrations = await registrationRepository.GetRegistrationsByPersonAsync(id);

        logger.LogInformation($"Getting registrations for person: {id}");
        return mapper.Map<IEnumerable<DtoRegistration>>(registrations);
    }
}
