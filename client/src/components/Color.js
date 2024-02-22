import React from "react";

export const Color = (props) => {
  const { colorData, setColor, color } = props;
  return (
    <>
      <ul className="colors ps-0">
        {colorData?.map((item, index) => (
          <li
            onClick={() => {
              setColor(item?._id);
            }}
            key={index}
            style={{
              backgroundColor: item?.title,
              border: color === item?._id ? "3px solid black" : "none",
            }}
          ></li>
        ))}
      </ul>
    </>
  );
};
