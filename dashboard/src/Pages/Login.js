import React from "react";
import { CustomInput } from "../Components/CustomInput";
import { Link } from "react-router-dom";

export const Login = () => {
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
          <h3 className="text-center ">Login</h3>
          <p className="text-center ">Login to Your Account To Continue</p>
          <form action="">
            <CustomInput
              type="email"
              placeholder="Email Address"
              label="Email Address"
              id="email"
              i_class="w-100 mt-3"
            />
            <CustomInput
              type="password"
              placeholder="Password"
              label="Password"
              id="password"
              i_class="w-100 my-3"
            />
            <div className="mb-3 text-end"> 
              <Link to={"/forgot-password"}>Forgot Password ?</Link>
            </div>
            <Link
              to={"/admin"}
              className="border-0 px-3 py-2 text-white w-100"
              type="submit"
              style={{ backgroundColor: "#ffd333" }}
            >
              Login
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};
