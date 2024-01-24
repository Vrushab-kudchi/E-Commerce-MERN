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

export const AddBlog = () => {
  const [des, setDes] = useState("");
  const handleDes = (e) => {
    setDes(e);
  };
  return (
    <div>
      <h3 className="mb-0">AddBlog</h3>

      <div>
        <form action="">
          <div className="mt-4 title">
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
          <CustomInput type="text" label="Enter Blog Title" />
          <select name="" className="form-control my-3" id="">
            <option value="">Select Blog Category</option>
          </select>
          <ReactQuill
            theme="snow"
            value={des}
            onChange={(content) => {
              handleDes(content);
            }}
          />
          <button className="btn btn-success border-0 mt-5">Add Blog</button>
        </form>
      </div>
    </div>
  );
};
