import { BreadCrumb } from "../components/BreadCrumb";
import { Meta } from "../components/Meta";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/users/userSlice";
import { useEffect } from "react";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Enter Valid Email").required("Email is Required"),
  password: Yup.string().required("Password is required"),
});

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.auth);
  const { isSuccess, isError } = userState;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
      // alert(JSON.stringify(values, null, 2));
    },
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      window.location.reload();
    } else if (isError) {
      formik.resetForm();
    }
  }, [isSuccess, isError, navigate]);

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
                <form
                  onSubmit={formik.handleSubmit}
                  className="d-flex flex-column gap-15"
                >
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      className="form-control"
                    />
                  </div>
                  <div className="error">
                    {formik.errors.email && formik.touched.email ? (
                      <div>{formik.errors.email}</div>
                    ) : null}
                  </div>
                  <div className="mt-1">
                    <input
                      placeholder="Password"
                      type="password"
                      name="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      className="form-control"
                    />
                  </div>
                  <div className="error">
                    {formik.errors.password && formik.touched.password ? (
                      <div>{formik.errors.password}</div>
                    ) : null}
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
