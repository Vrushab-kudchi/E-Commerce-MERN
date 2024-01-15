import { BreadCrumb } from "../components/BreadCrumb";
import { Meta } from "../components/Meta";


export const Signup = () => {
  return (
    <>
      <Meta title="Sign Up" />
      <BreadCrumb title="Create Account" />
      <div className="login-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3 ">Create Account</h3>
              <form action="" className="d-flex flex-column gap-15">
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="form-control"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="form-control"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    name="mobileno"
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
                <div className="mt-3 d-flex gap-15 justify-content-center align-items-center">
                  <button className="button border-0">Create</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
