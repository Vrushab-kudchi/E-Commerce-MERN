import React, { useState } from "react";
import { BreadCrumb } from "../components/BreadCrumb";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../features/users/userSlice";
import { FiEdit } from "react-icons/fi";

const profileSchema = Yup.object().shape({
  firstname: Yup.string().required("Please enter your first name"),
  lastname: Yup.string().required("Please enter your last name"),
  email: Yup.string()
    .email("Email should be valid")
    .required("Email address is required"),
  mobile: Yup.string()
    .matches(/^\d{10}$/, "Please enter a valid 10-digit mobile number")
    .required("Mobile number is required"),
});

export default function Profile() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.auth.user);
  const [edit, setEdit] = useState(true);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: "" || userState.firstname,
      lastname: "" || userState.lastname,
      email: "" || userState.email,
      mobile: "" || userState.mobile,
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      dispatch(updateUser(values));
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
  });
  return (
    <>
      <BreadCrumb title="My Profile" />
      <div className="cart-wrapper home-wrapper-2">
        <div className="container py-5">
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center mb-5">
                <h3>Update Profile</h3>
                <FiEdit className="fs-4" onClick={() => setEdit(false)} />
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="firstname" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    disabled={edit}
                    className="form-control"
                    id="firstname"
                    name="firstname"
                    onChange={formik.handleChange}
                    value={formik.values.firstname}
                  />
                  <div className="error mt-2">
                    {formik.errors.firstname && formik.touched.firstname ? (
                      <div>{formik.errors.firstname}</div>
                    ) : null}
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="lastname" className="form-label">
                    Last Name
                  </label>
                  <input
                    disabled={edit}
                    type="text"
                    className="form-control"
                    id="lastname"
                    name="lastname"
                    onChange={formik.handleChange}
                    value={formik.values.lastname}
                  />
                  <div className="error mt-2">
                    {formik.errors.lastname && formik.touched.lastname ? (
                      <div>{formik.errors.lastname}</div>
                    ) : null}
                  </div>
                </div>

                <div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      disabled={edit}
                      className="form-control"
                      id="exampleInputEmail1"
                      name="email"
                      aria-describedby="emailHelp"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    <div className="error mt-2">
                      {formik.errors.email && formik.touched.email ? (
                        <div>{formik.errors.email}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="mobileno" className="form-label">
                      Mobile No
                    </label>
                    <input
                      type="number"
                      disabled={edit}
                      className="form-control"
                      id="mobileno"
                      name="mobile"
                      onChange={formik.handleChange}
                      value={formik.values.mobile}
                    />
                    <div className="error mt-2">
                      {formik.errors.mobile && formik.touched.mobile ? (
                        <div>{formik.errors.mobile}</div>
                      ) : null}
                    </div>
                  </div>
                </div>

                {!edit ? (
                  <button type="submit" className="btn btn-primary mt-4">
                    Save
                  </button>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
