import React from "react";

const FormErrorBanner = ({ errors }) => {
  return (
    <>
      <div className="text-red-500 bg-red-200 p-2 rounded text-center">
        <p>{errors && errors.message}</p>
      </div>
    </>
  );
};

export default FormErrorBanner;
