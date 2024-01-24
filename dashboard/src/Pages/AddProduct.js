import React, { useState } from "react";
import { CustomInput } from "../Components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: true,
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

export const AddProduct = () => {
  const [des, setDes] = useState("");
  const handleDes = (e) => {
    setDes(e);
  };
  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
        <form action="">
          <CustomInput type="text" label="Enter Product Title" />
          <ReactQuill
            className="mt-3"
            theme="snow"
            value={des}
            onChange={(content) => {
              handleDes(content);
            }}
          />

          <CustomInput type="number" label="Enter Price" />

          <select name="" className="form-control my-3" id="">
            <option value="">Select Category</option>
          </select>

          <select name="" className="form-control my-3" id="">
            <option value="">Select Color</option>
          </select>

          <select name="" className="form-control my-3" id="">
            <option value="">Select Brand</option>
          </select>

          <CustomInput type="number" label="Enter Quantity" />

          <div className="mt-4">
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from
                uploading company data or other banned files.
              </p>
            </Dragger>
          </div>

          <button className="btn btn-success border-0 rounded-3 my-5">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};
