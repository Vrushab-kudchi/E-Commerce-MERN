import { useFormik } from "formik";
import { BreadCrumb } from "../components/BreadCrumb";
import { Meta } from "../components/Meta";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "../features/users/userSlice";

export const ResetPassword = () => {
  const dispatch = useDispatch();
  const token = useParams();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: "",
      rePassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Password is required"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please confirm your password"),
    }),
    onSubmit: (values) => {
      const data = {
        password: values.password,
        token: token.token,
      };
      dispatch(resetPassword(data));
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    },
  });

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
                <form
                  onSubmit={formik.handleSubmit}
                  className="d-flex flex-column gap-15"
                >
                  <div>
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      className="form-control"
                    />
                    <div className="error">
                      {formik.errors.password && formik.touched.password ? (
                        <div>{formik.errors.password}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="mt-1">
                    <input
                      placeholder="Confirm Password"
                      type="password"
                      name="rePassword"
                      onChange={formik.handleChange}
                      value={formik.values.rePassword}
                      className="form-control"
                    />
                    <div className="error">
                      {formik.errors.rePassword && formik.touched.rePassword ? (
                        <div>{formik.errors.rePassword}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="mt-3 d-flex gap-15 justify-content-center align-items-center">
                    <button className="button border-0" type="submit">
                      Reset
                    </button>
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
