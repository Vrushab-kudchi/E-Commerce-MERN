import { useFormik } from "formik";
import { BreadCrumb } from "../components/BreadCrumb";
import { Meta } from "../components/Meta";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { forgotPasswordToken } from "../features/users/userSlice";

const emailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Give Valid Email")
    .required("Please enter an Email"),
});

export const ForgotPassword = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: emailSchema,
    onSubmit: (values) => {
      dispatch(forgotPasswordToken(values));
    },
  });
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
                <form
                  onSubmit={formik.handleSubmit}
                  className="d-flex flex-column gap-15"
                >
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      className="form-control"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    <div className="error text-center">
                      {formik.errors.email && formik.touched.email ? (
                        <div>{formik.errors.email}</div>
                      ) : null}
                    </div>
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
