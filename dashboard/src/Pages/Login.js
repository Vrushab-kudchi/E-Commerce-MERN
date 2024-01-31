import React, { useEffect } from "react";
import { CustomInput } from "../Components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("invalid email").required("enter the email"),
      password: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("enter the password"),
    }),

    onSubmit: (values) => {
      dispatch(login(values));
    },
  });
  const { user, isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isSuccess) {
      navigate("/admin");
    } else {
      navigate("");
    }
  }, [user, isError, isSuccess, message, isLoading, navigate]);
  return (
    <>
      <div
        className="py-5"
        style={{ backgroundColor: "#ffd333", minHeight: "100vh" }}
      >
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4 gap-4">
          <h3 className="text-center ">Login</h3>
          <p className="text-center ">Login to Your Account To Continue</p>
          <div className="error text-center">
            {message === "Rejected" ? "You are Not an Admin" : ""}
          </div>
          <form onSubmit={formik.handleSubmit}>
            <CustomInput
              type="email"
              placeholder="Email Address"
              label="Email Address"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              i_class="w-100 mt-3"
            />
            <div className="error">
              {formik.errors.email && formik.touched.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </div>
            <CustomInput
              type="password"
              placeholder="Password"
              label="Password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              i_class="w-100"
            />
            <div className="error">
              {formik.errors.password && formik.touched.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="mb-3 text-end">
              <Link to={"/forgot-password"}>Forgot Password ?</Link>
            </div>
            <button
              className="border-0 px-3 py-2 text-white w-100"
              type="submit"
              style={{ backgroundColor: "#ffd333" }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
