import React from "react";
import { CustomInput } from "../Components/CustomInput";

export const AddBrand = () => {
  return (
    <div>
      <h3 className="mb-4 title">Add Blog Category</h3>
      <div>
        <form action="">
          <CustomInput type="text" label="Enter Brand" />
          <button className="btn btn-success border-0 rounded-3 my-5">
            Add brand
          </button>
        </form>
      </div>
    </div>
  );
};
