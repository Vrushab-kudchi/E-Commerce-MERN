import React, { useEffect } from "react";
import { CustomInput } from "../Components/CustomInput";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  createColor,
  getAColor,
  resetState,
  updateColor,
} from "../features/color/colorSlice";

const colorSchema = Yup.object().shape({
  title: Yup.string().required("Color is required"),
});

export const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const newColor = useSelector((state) => state.color);
  const {
    isLoading,
    isSucces,
    isError,
    createdColor,
    colorName,
    updatedColor,
  } = newColor;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName || "",
    },
    validationSchema: colorSchema,
    onSubmit: (values) => {
      if (id) {
        dispatch(updateColor({ ...values, _id: id }));
        navigate("/admin/color-list");
      } else {
        dispatch(createColor(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          navigate("/admin/color-list");
        }, [3000]);
      }
    },
  });

  useEffect(() => {
    if (id) {
      dispatch(resetState());
      dispatch(getAColor(id));
    } else {
      dispatch(resetState());
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (isLoading) {
      toast.info("Adding Product...");
    } else if (isSucces && createdColor) {
      toast.success("Product Added");
    } else if (isSucces && updatedColor) {
      toast.success("Success");
    } else if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [isLoading, isSucces, isError, createdColor, updatedColor]);

  return (
    <div>
      <h3 className="mb-4 title">
        {id !== undefined ? "Edit" : "Create"} Color
      </h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="color"
            label="Enter Color"
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
            {id !== undefined ? "Edit" : "Create"} Color
          </button>
        </form>
      </div>
    </div>
  );
};
