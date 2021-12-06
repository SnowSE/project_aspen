namespace Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PersonController : ControllerBase
{
    private readonly IPersonRepository personRepository;
    private readonly IRegistrationRepository registrationRepository;
    private readonly IMapper mapper;
    private string getModelStateErrorMessage() =>
        string.Join(" | ",
            ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
            );

    public PersonController(IPersonRepository personRepository, IRegistrationRepository registrationRepository, IMapper mapper)
    {
        this.mapper = mapper;
        this.personRepository = personRepository;
        this.registrationRepository = registrationRepository;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<DtoPerson>> GetByID(long id)
    {
        if (!await personRepository.ExistsAsync(id))
            return NotFound("Person id does not exist");
        var person = await personRepository.GetByIDAsync(id);
        return mapper.Map<DtoPerson>(person);
    }

    [HttpGet("authid/{authId}")]
    public async Task<ActionResult<DtoPerson>> GetByAuthId(string authId)
    {
        var person = await personRepository.GetByAuthIdAsync(authId);
        if (person == null)
            return NotFound("AuthID does not exist");
        return mapper.Map<DtoPerson>(person);
    }

    [HttpPost]
    public async Task<ActionResult<DtoPerson>> Add([FromBody] DtoPerson dtoPerson)
    {
        if (!ModelState.IsValid)
            return BadRequest(getModelStateErrorMessage());

        if (dtoPerson.ID != 0)
            return BadRequest("Cannot add with a valid id");

        if (string.IsNullOrEmpty(dtoPerson.AuthID))
        {
            var person = await personRepository.AddAsync(dtoPerson.Name, dtoPerson.Bio);
            return mapper.Map<DtoPerson>(person);
        }
        else
        {
            var person = await personRepository.AddAsync(dtoPerson.Name, dtoPerson.Bio, dtoPerson.AuthID);
            return mapper.Map<DtoPerson>(person);
        }
    }

    [HttpPut()]
    public async Task<ActionResult<DtoPerson>> Edit([FromBody] DtoPerson dtoPerson)
    {
        if (!ModelState.IsValid)
            return BadRequest(getModelStateErrorMessage());
        if (!await personRepository.ExistsAsync(dtoPerson.ID))
            return NotFound("Person id does not exist");

        var person = mapper.Map<Person>(dtoPerson);
        var updatedPerson = await personRepository.EditAsync(person);
        return mapper.Map<DtoPerson>(updatedPerson);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(long id)
    {
        if (!await personRepository.ExistsAsync(id))
            return NotFound("Person id does not exist");

        await personRepository.DeleteAsync(id);
        return Ok();
    }

    [HttpGet("{id}/registrations")]
    public async Task<IEnumerable<DtoRegistration>> GetRegistrationsByID(long id)
    {
        if (await personRepository.ExistsAsync(id) is false)
            throw new NotFoundException<IEnumerable<DtoRegistration>>("Person id does not exist");

        var registrations = await registrationRepository.GetRegistrationsByPersonAsync(id);
        return mapper.Map<IEnumerable<DtoRegistration>>(registrations);
    }
}
