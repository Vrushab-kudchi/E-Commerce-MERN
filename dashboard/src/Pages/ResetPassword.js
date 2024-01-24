import React from "react";
import { CustomInput } from "../Components/CustomInput";

export const ResetPassword = () => {
  return (
    <>
      <div
        className="py-5"
        style={{ backgroundColor: "#ffd333", minHeight: "100vh" }}
      >
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4 gap-4">
          <h3 className="text-center ">Reset Password</h3>
          <p className="text-center ">Enter Your New Password</p>
          <form action="">
            <CustomInput
              type="password"
              placeholder="Password"
              label="Password"
              id="pass"
              i_class="w-100 my-3"
            />
            <CustomInput
              type="password"
              placeholder="Confirm Password"
              label="Confirm Password"
              id="conf-pass"
              i_class="w-100 my-3"
            />
            <button
              className="border-0 px-3 py-2 text-white fw-bold w-100"
              type="Reset"
              style={{ backgroundColor: "#ffd333" }}
            >
              Forgot Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
