import React from "react";

export const Container = (props) => {
  return (
    <setion className={props.class1}>
      <div className="container-xxl">{props.children}</div>
    </setion>
  );
};
