* Note: All return types are ApiResult<T>

- Global Admin API
    - GlobalAdminController (previously AdminCharityController)
        - GetAll() : IEnum<Charity>
        - Get(guid charityid) : Charity
        - Create(charity) : success/fail
        - Update(charity) : success/fail
        - Delete(charity) : success/fail
- Charity API
    - Charity Controller
        - Get(string domain) : Charity
        - Get(guid charityId) : Charity
        - GetTheme(guid charityId) : Theme
        - GetHomePage(guid charityId) : HomePage
        - UpdateTheme(ThemeRequest) : bool
    - Team Controller
        - GetCharityById(guid charityId) : IEnum<Teams>
        - Create(TeamRequest) : bool
        - Update(TeamRequest) : Team
        - Delete(TeamRequest) : bool
    - Users Controller
        - Authenticate(AuthenticateModel) : Token
        - GetAll(guid charityId) : IEnum<User>
        - CreateUser(CreateUserRequest) : OK / BadRequest
        - DeleteUser(DeleteUserRequest) : Ok / BadRequest
        - UpdateUser(UpdateUserRequest) : OK
        - UpdateUserPassword(UpdateUserRequest) : OK
    - 



