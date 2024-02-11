import React, { useEffect } from "react";
import { CustomInput } from "../Components/CustomInput";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { createCoupon, resetState } from "../features/coupon/couponSlice";

const couponSchema = Yup.object().shape({
  name: Yup.string().required("Coupon name is required"),
  expiry: Yup.date().required("Expiry date is required"),
  discount: Yup.number().required("Discound is Required"),
});

export const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      expiry: "",
      discount: "",
    },
    validationSchema: couponSchema,
    onSubmit: (values) => {
      values.expiry = new Date(values.expiry).toLocaleString("en-GB");
      dispatch(createCoupon(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/coupon-list");
      }, [3000]);
      // alert(JSON.stringify(values, null, 2));
    },
  });

  const newCoupon = useSelector((state) => state.coupon);
  const { isLoading, isSucces, isError, createdCoupon } = newCoupon;
  useEffect(() => {
    if (isLoading) {
      toast.info("Adding Product...");
    } else if (isSucces && createdCoupon) {
      toast.success("Product Added");
    } else if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [isLoading, isSucces, isError, createdCoupon]);

  return (
    <div>
      <h3 className="mb-4 title">Add Coupon</h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Coupon"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <div className="error mt-1">
            {formik.touched.name && formik.errors.name ? (
              <div>{formik.errors.name}</div>
            ) : null}
          </div>

          <CustomInput
            type="date"
            label="Expiry date"
            name="expiry"
            onChange={formik.handleChange}
            value={formik.values.expiry}
          />
          <div className="error mt-1">
            {formik.touched.expiry && formik.errors.expiry ? (
              <div>{formik.errors.expiry}</div>
            ) : null}
          </div>

          <CustomInput
            type="number"
            label="Discount"
            name="discount"
            onChange={formik.handleChange}
            value={formik.values.discount}
          />
          <div className="error mt-1">
            {formik.touched.discount && formik.errors.discount ? (
              <div>{formik.errors.discount}</div>
            ) : null}
          </div>
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            Add coupon
          </button>
        </form>
      </div>
    </div>
  );
};
