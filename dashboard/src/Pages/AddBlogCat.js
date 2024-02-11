import React, { useEffect } from "react";
import { CustomInput } from "../Components/CustomInput";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  createBlogCategory,
  resetState,
} from "../features/bCategory/bCategorySlice";

const categorySchema = Yup.object().shape({
  title: Yup.string().required("Brand name is required"),
});

export const AddBlogCat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: categorySchema,
    onSubmit: (values) => {
      dispatch(createBlogCategory(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/blog-category-list");
      }, [3000]);
    },
  });

  const newCategory = useSelector((state) => state.bCategory);
  const { isLoading, isSucces, isError, createdCategory } = newCategory;
  useEffect(() => {
    if (isLoading) {
      toast.info("Adding Product...");
    } else if (isSucces && createdCategory) {
      toast.success("Product Added");
    } else if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [isLoading, isSucces, isError, createdCategory]);

  return (
    <div>
      <h3 className="mb-4 title">Add Blog Category</h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Blog Category"
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
            Add Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};
