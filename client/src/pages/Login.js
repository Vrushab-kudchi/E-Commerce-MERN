import { BreadCrumb } from "../components/BreadCrumb";
import { Meta } from "../components/Meta";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <>
      <Meta title="Login" />
      <BreadCrumb title="Login" />
      <div className="login-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3 ">Login</h3>
                <form action="" className="d-flex flex-column gap-15">
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      className="form-control"
                    />
                  </div>
                  <div className="mt-1">
                    <input
                      placeholder="Password"
                      type="password"
                      name="password"
                      className="form-control"
                    />
                  </div>
                  <div>
                    <Link to={"/forgot-password"}>Forgot Password ?</Link>
                  </div>
                  <div className="mt-3 d-flex gap-15 justify-content-center align-items-center">
                    <button className="button border-0" type="submit">
                      Login
                    </button>
                    <Link className="button signup" to={"/signup"}>
                      Sign Up
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
