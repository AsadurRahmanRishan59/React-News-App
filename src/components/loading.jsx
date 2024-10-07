import React from "react";

export default function Loading() {
  return (
    <div className="d-flex align-items-center">
      <strong>Loading...</strong>
      <div
        className="spinner-border text-danger ms-auto"
        role="status"
        aria-hidden="true"
      ></div>
    </div>
  );
}
