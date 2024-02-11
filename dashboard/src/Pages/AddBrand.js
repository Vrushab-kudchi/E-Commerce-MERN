import React, { useEffect } from "react";
import { CustomInput } from "../Components/CustomInput";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createBrand,
  getABrand,
  resetState,
  updateBrand,
} from "../features/brand/brandSlice";
import { toast } from "react-toastify";

const brandSchema = Yup.object().shape({
  title: Yup.string().required("Brand name is required"),
});

export const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const newBrand = useSelector((state) => state.brand);
  const {
    isLoading,
    isSucces,
    isError,
    createdBrand,
    brandName,
    updatedBrand,
  } = newBrand;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema: brandSchema,
    onSubmit: (values) => {
      if (id) {
        dispatch(updateBrand({ ...values, _id: id }));
        navigate("/admin/brand-list");
      } else {
        dispatch(createBrand(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          navigate("/admin/brand-list");
        }, [3000]);
      }
    },
  });

  useEffect(() => {
    if (id) {
      dispatch(getABrand(id));
    } else {
      dispatch(resetState());
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (isLoading) {
      // toast.info("Adding Product...");
    } else if (isSucces && createdBrand) {
      toast.success("Success");
    } else if (isSucces && updatedBrand) {
      toast.success("Success");
    } else if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [isLoading, isSucces, isError, createdBrand, updatedBrand]);

  return (
    <div>
      <h3 className="mb-4 title">
        {id !== undefined ? "Edit" : "Create"} Brand
      </h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Brand"
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          <div className="error mt-1">
            {formik.touched.title && formik.errors.title ? (
              <div>{formik.errors.title}</div>
            ) : null}
          </div>
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            {id !== undefined ? "Edit" : "Create"} brand
          </button>
        </form>
      </div>
    </div>
  );
};
