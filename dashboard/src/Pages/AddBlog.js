import React, { useEffect } from "react";
import { CustomInput } from "../Components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import { deleteImage, uploadImage } from "../features/upload/uploadSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { getBlogCategory } from "../features/bCategory/bCategorySlice";
import { createBlog, resetState } from "../features/blog/blogSlice";

let blogSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
  images: Yup.array().required("images are required"),
});

export const AddBlog = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      description: "",
      images: null,
    },
    validationSchema: blogSchema,
    onSubmit: (values) => {
      dispatch(createBlog(values));
      formik.resetForm();
      dispatch(uploadImage([]));
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/blog-list");
      }, [3000]);

      // alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    dispatch(getBlogCategory());
  }, [dispatch]);

  const bCategoryState = useSelector((state) => state.bCategory.category);
  const imgState = useSelector((state) => state.upload.images);
  const newBlog = useSelector((state) => state.blog);
  const { isLoading, isSucces, isError, createdBlog } = newBlog;

  useEffect(() => {
    if (isLoading) {
      toast.info("Adding Product...");
    } else if (isSucces && createdBlog) {
      toast.success("Product Added");
    } else if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [isLoading, isSucces, isError, createdBlog]);

  useEffect(() => {
    formik.values.images = imgState;
  }, [imgState, formik]);

  return (
    <div>
      <h3 className="mb-0">AddBlog</h3>

      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-4 title"></div>
          <CustomInput
            type="text"
            label="Enter Blog Title"
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          <div className="error mt-1">
            {formik.touched.title && formik.errors.title ? (
              <div>{formik.errors.title}</div>
            ) : null}
          </div>
          <select
            name="category"
            onChange={formik.handleChange}
            value={formik.values.category}
            className="form-control my-3"
          >
            <option value="">Select Blog Category</option>
            {bCategoryState?.map((item, index) => {
              return (
                <option key={index} value={item.title}>
                  {item.title}
                </option>
              );
            })}
          </select>
          <div className="error mt-1">
            {formik.touched.category && formik.errors.category ? (
              <div>{formik.errors.category}</div>
            ) : null}
          </div>

          <ReactQuill
            theme="snow"
            onChange={(value) => formik.setFieldValue("description", value)}
            value={formik.values.description}
          />
          <div className="error mt-1">
            {formik.touched.description && formik.errors.description ? (
              <div>{formik.errors.description}</div>
            ) : null}
          </div>

          <div className="mt-4 bg-white border-1 p-5 text-center ">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImage(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="error">
            {formik.touched.images && formik.errors.images ? (
              <div>{formik.errors.images}</div>
            ) : null}
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {imgState?.map((item, index) => {
              return (
                <div className=" position-relative" key={index}>
                  <button
                    type="button"
                    onClick={() => dispatch(deleteImage(item.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img
                    src={item.url}
                    alt="Uploading Images From Dashboard"
                    width={200}
                    height={200}
                  />
                </div>
              );
            })}
          </div>

          <button type="submit" className="btn btn-success border-0 mt-5">
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};
