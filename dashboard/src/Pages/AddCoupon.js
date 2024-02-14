import React, { useEffect } from "react";
import { CustomInput } from "../Components/CustomInput";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  createCoupon,
  getACoupon,
  resetState,
  updateCoupon,
} from "../features/coupon/couponSlice";

const couponSchema = Yup.object().shape({
  name: Yup.string().required("Coupon name is required"),
  expiry: Yup.date().required("Expiry date is required"),
  discount: Yup.number().required("Discound is Required"),
});

export const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const newCoupon = useSelector((state) => state.coupon);
  const {
    isLoading,
    isSucces,
    isError,
    createdCoupon,
    couponData,
    updatedCoupon,
  } = newCoupon;

  const changeDateFormat = (data) => {
    const newDate = new Date(data).toLocaleDateString();
    const [month, day, year] = newDate.split("/");
    return [year, day, month].join("-");
  };

  console.log(couponData?.expiry);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponData?.name || "",
      expiry: changeDateFormat(couponData?.expiry) || "",
      discount: couponData?.discount || "",
    },
    validationSchema: couponSchema,
    onSubmit: (values) => {
      if (id) {
        dispatch(updateCoupon({ ...values, _id: id }));

        navigate("/admin/coupon-list");
      } else {
        values.expiry = new Date(values.expiry).toLocaleString("en-GB");
        dispatch(resetState());
        dispatch(createCoupon(values));
        formik.resetForm();
        setTimeout(() => {
          navigate("/admin/coupon-list");
        }, [3000]);
      }

      // alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    if (id) {
      dispatch(getACoupon(id));
    } else {
      dispatch(resetState());
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (isLoading) {
      toast.info("Adding Product...");
    } else if (isSucces && createdCoupon) {
      toast.success("Product Added");
    } else if (isSucces && updatedCoupon) {
      toast.success("Success");
    } else if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [isLoading, isSucces, isError, createdCoupon, updatedCoupon]);

  return (
    <div>
      <h3 className="mb-4 title">
        {" "}
        {id !== undefined ? "Edit" : "Create"} Coupon
      </h3>
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
            {id !== undefined ? "Edit" : "Create"} coupon
          </button>
        </form>
      </div>
    </div>
  );
};
