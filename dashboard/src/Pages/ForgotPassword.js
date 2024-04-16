import React from "react";
import { CustomInput } from "../Components/CustomInput";

export const ForgotPassword = () => {
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
          <h3 className="text-center ">Forgot Password</h3>
          <p className="text-center ">Please Enter Your Email Address</p>
          <form action="">
            <CustomInput
              type="email"
              placeholder="Email Address"
              label="Email Address"
              id="email"
              i_class="w-100 my-3"
            />
            <button
              className="border-0 px-3 py-2 text-white fw-bold w-100"
              type="submit"
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
