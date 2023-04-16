import "./login.css";

export const LoginPage = () => {
  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Sign in</h3>
          <form>
            <div className="form-group mb-2">
              <input type="text" className="form-control" placeholder="Email" />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
            <div className="d-grid gap-2">
              <input type="submit" className="btn btn-primary" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Register</h3>
          <form>
            <div className="form-group mb-2">
              <input type="text" className="form-control" placeholder="Name" />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
              />
            </div>

            <div className="d-grid gap-2">
              <input
                type="submit"
                className="btn btn-danger"
                value="Register"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
