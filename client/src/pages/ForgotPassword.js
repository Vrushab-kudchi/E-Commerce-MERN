import { BreadCrumb } from "../components/BreadCrumb";
import { Meta } from "../components/Meta";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
  return (
    <>
      <Meta title="Forgot Password" />
      <BreadCrumb title="Forgot Password" />
      <div className="container-xxl">
        <div className="login-wrapper home-wrapper-2 py-5">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3 ">Reset Your Password</h3>
                <p className="text-center my-2 mb-3">
                  We Will Send You An Email To Reset The Password
                </p>
                <form action="" className="d-flex flex-column gap-15">
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      className="form-control"
                    />
                  </div>

                  <div className="mt-3  text-center gap-15 justify-content-center align-items-center">
                    <button className="button border-0" type="submit">
                      Submit
                    </button>
                    <div>
                      <Link to={"/login"} className="mt-3">
                        Cancel
                      </Link>
                    </div>
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
