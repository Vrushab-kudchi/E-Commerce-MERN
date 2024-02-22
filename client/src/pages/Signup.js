import { BreadCrumb } from "../components/BreadCrumb";
import { Meta } from "../components/Meta";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/users/userSlice";
import { useNavigate } from "react-router-dom";

const registerSchema = Yup.object().shape({
  firstname: Yup.string().required("First Name is Required"),
  lastname: Yup.string().required("Last Name is Required"),
  email: Yup.string().email("Not a proper email").required("Email is Required"),
  mobile: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits")
    .required("Mobile No is Required"),
  password: Yup.string().required("Password is Required"),
});

export const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const { isSuccess } = authState;
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });
  if (isSuccess) {
    navigate("/login");
  }
  return (
    <>
      <Meta title="Sign Up" />
      <BreadCrumb title="Create Account" />
      <div className="login-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3 ">Create Account</h3>
              <form
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-15"
              >
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    onChange={formik.handleChange}
                    name="firstname"
                    value={formik.values.firstname}
                    className="form-control"
                  />
                </div>
                <div className="error">
                  {formik.errors.firstname && formik.touched.firstname ? (
                    <div>{formik.errors.firstname}</div>
                  ) : null}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    onChange={formik.handleChange}
                    value={formik.values.lastname}
                    name="lastname"
                    className="form-control"
                  />
                </div>
                <div className="error">
                  {formik.errors.lastname && formik.touched.lastname ? (
                    <div>{formik.errors.lastname}</div>
                  ) : null}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    name="email"
                    className="form-control"
                  />
                </div>
                <div className="error">
                  {formik.errors.email && formik.touched.email ? (
                    <div>{formik.errors.email}</div>
                  ) : null}
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    onChange={formik.handleChange}
                    value={formik.values.mobile}
                    name="mobile"
                    className="form-control"
                  />
                </div>
                <div className="error">
                  {formik.errors.mobile && formik.touched.mobile ? (
                    <div>{formik.errors.mobile}</div>
                  ) : null}
                </div>
                <div className="mt-1">
                  <input
                    placeholder="Password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    name="password"
                    className="form-control"
                  />
                </div>
                <div className="error">
                  {formik.errors.password && formik.touched.password ? (
                    <div>{formik.errors.password}</div>
                  ) : null}
                </div>
                <div className="mt-3 d-flex gap-15 justify-content-center align-items-center">
                  <button type="submit" className="button border-0">
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
