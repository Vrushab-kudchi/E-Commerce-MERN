import React, { useEffect } from "react";
import { CustomInput } from "../Components/CustomInput";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  createBlogCategory,
  getABlogCategory,
  resetState,
  updateBlogCategory,
} from "../features/bCategory/bCategorySlice";

const categorySchema = Yup.object().shape({
  title: Yup.string().required("Blog name is required"),
});

export const AddBlogCat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const newCategory = useSelector((state) => state.bCategory);
  const {
    isLoading,
    isSucces,
    isError,
    createdCategory,
    updatedCategory,
    categoryName,
  } = newCategory;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: categorySchema,
    onSubmit: (values) => {
      if (id) {
        dispatch(updateBlogCategory({ ...values, _id: id }));
        dispatch(resetState());
        navigate("/admin/blog-category-list");
      } else {
        dispatch(createBlogCategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          navigate("/admin/blog-category-list");
        }, [3000]);
      }
    },
  });

  useEffect(() => {
    if (id) {
      dispatch(resetState());
      dispatch(getABlogCategory(id));
    } else {
      dispatch(resetState());
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (isLoading) {
      toast.info("Adding Product...");
    } else if (isSucces && createdCategory) {
      toast.success("Product Added");
    } else if (isSucces && updatedCategory) {
      toast.success("Success");
    } else if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [isLoading, isSucces, isError, createdCategory, updatedCategory]);

  return (
    <div>
      <h3 className="mb-4 title">
        {id !== undefined ? "Edit" : "Create"} Blog Category
      </h3>
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
            {id !== undefined ? "Edit" : "Create"} Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};
