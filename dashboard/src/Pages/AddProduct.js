import React, { useEffect, useState } from "react";
import { CustomInput } from "../Components/CustomInput";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getCategory } from "../features/pCategory/pCategorySlice";
import { getBrand } from "../features/brand/brandSlice";
import { getColor } from "../features/color/colorSlice";
import Dropzone from "react-dropzone";
import { deleteImage, uploadImage } from "../features/upload/uploadSlice";
import { createProducts } from "../features/product/productSlice";
import { toast } from "react-toastify";

//react-select
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();
//ends

let productSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  category: Yup.string().required("Category is required"),
  brand: Yup.string().required("Brand is required"),
  quantity: Yup.number()
    .required("Quantity is required")
    .positive("Quantity must be positive")
    .integer("Quantity must be an integer"),
  color: Yup.array().required("Color is required"),
  tags: Yup.array().required("tag is required"),
  images: Yup.array().required("images are required"),
});

export const AddProduct = () => {
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      category: "",
      brand: "",
      color: [],
      tags: [],
      quantity: "",
      images: null,
    },
    validationSchema: productSchema,
    onSubmit: (values) => {
      dispatch(createProducts(values));
      formik.resetForm();
      setTags([]);
      setInputValue("");
      dispatch(uploadImage([]));
      setTimeout(() => {
        navigate("/admin/product-list");
      }, [3000]);

      // alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getBrand());
    dispatch(getColor());
  }, [dispatch]);

  const categoryState = useSelector((state) => state.pCategory.category);
  const brandState = useSelector((state) => state.brand.brands);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);
  const { isLoading, isSucces, isError, createdProduct } = newProduct;

  useEffect(() => {
    if (isLoading) {
      toast.info("Adding Product...");
    } else if (isSucces && createdProduct) {
      toast.success("Product Added");
    } else if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [isLoading, isSucces, isError, createdProduct]);

  useEffect(() => {
    const tagData = tags.map((item) => item.value);
    formik.values.images = imgState;
    formik.values.tags = tagData;
  }, [imgState, formik, tags]);

  let color = [];
  colorState.map((item) => {
    return color.push({
      label: item.title,
      value: item._id,
    });
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="title"
            label="Enter Product Title"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          <div className="error">
            {formik.errors.title && formik.touched.title ? (
              <div>{formik.errors.title}</div>
            ) : null}
          </div>
          <ReactQuill
            className="mt-3"
            theme="snow"
            value={formik.values.description}
            onChange={formik.handleChange("description")}
          />
          <div className="error">
            {formik.touched.description && formik.errors.description ? (
              <div>{formik.errors.description}</div>
            ) : null}
          </div>
          <CustomInput
            type="number"
            label="Enter Price"
            name="price"
            onChange={formik.handleChange}
            value={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price ? (
              <div>{formik.errors.price}</div>
            ) : null}
          </div>
          <select
            name="category"
            className="form-control my-3"
            onChange={formik.handleChange}
            value={formik.values.category}
          >
            <option value="">Select Category</option>
            {categoryState.map((item, index) => {
              return (
                <option value={item.title} key={index}>
                  {item.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category ? (
              <div>{formik.errors.category}</div>
            ) : null}
          </div>
          <select
            name="brand"
            className="form-control my-3"
            onChange={formik.handleChange}
            value={formik.values.brand}
          >
            <option value="">Select Brand</option>
            {brandState.map((item, index) => {
              return (
                <option value={item.title} key={index}>
                  {item.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.brand && formik.errors.brand ? (
              <div>{formik.errors.brand}</div>
            ) : null}
          </div>

          <CreatableSelect
            className="my-3"
            isMulti
            onChange={(newValue, actionMeta) => setTags(newValue)}
            onInputChange={(inputValue) => setInputValue(inputValue)}
            options={tags}
            value={tags}
            inputValue={inputValue}
            isClearable
            placeholder="Enter Tags"
          />

          <div className="error">
            {formik.touched.tags && formik.errors.tags ? (
              <div>{formik.errors.tags}</div>
            ) : null}
          </div>

          <Select
            className="h-100"
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            placeholder="Select Colors"
            classNames="text-dark"
            options={color}
            onChange={(selectedOptions) => {
              formik.setFieldValue(
                "color",
                selectedOptions.map((option) => option.value)
              );
            }}
          />
          <div className="error">
            {formik.touched.color && formik.errors.color ? (
              <div>{formik.errors.color}</div>
            ) : null}
          </div>

          <div className="error">
            {formik.touched.color && formik.errors.color ? (
              <div>{formik.errors.color}</div>
            ) : null}
          </div>

          <CustomInput
            type="number"
            name="quantity"
            label="Enter Quantity"
            onChange={formik.handleChange}
            value={formik.values.quantity}
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity ? (
              <div>{formik.errors.quantity}</div>
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
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};
