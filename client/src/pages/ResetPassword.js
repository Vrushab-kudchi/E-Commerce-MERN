import { BreadCrumb } from "../components/BreadCrumb";
import { Meta } from "../components/Meta";

export const ResetPassword = () => {
  return (
    <>
      <Meta title="Reset Password" />
      <BreadCrumb title="Reset Password" />
      <div className="login-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3 ">Reset Password</h3>
                <form action="" className="d-flex flex-column gap-15">
                  <div>
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      className="form-control"
                    />
                  </div>
                  <div className="mt-1">
                    <input
                      placeholder="Confirm Password"
                      type="password"
                      name="password"
                      className="form-control"
                    />
                  </div>
                  <div className="mt-3 d-flex gap-15 justify-content-center align-items-center">
                    <button className="button border-0">Reset</button>
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
