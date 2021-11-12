import { AuthService } from "../services/authService";

const UnAuthorized = () => {
  return (
    <div className="d-flex my-5 justify-content-center">
      <div className="text-center">
        <h1 className="display-5 fw-bold">
          Whoops... Someone got a little too excited
        </h1>
        <p className="fs-4"> You need to log in to see this content</p>
        <p className="fw-light text-muted">401: Unauthorized</p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => AuthService.signinRedirect()}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default UnAuthorized;
