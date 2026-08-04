"use client";

import React from "react";
import { ToastContainer, ToastContainerProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultProps: ToastContainerProps = {
  position: "top-right",
  autoClose: 3500,
  hideProgressBar: false,
  newestOnTop: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  theme: "dark",
  toastClassName: "app-toast",
  progressClassName: "app-toast-progress",
};

/** Shared dark + gold toast chrome for all forms. */
const AppToast: React.FC<Partial<ToastContainerProps>> = (props) => {
  return <ToastContainer {...defaultProps} {...props} />;
};

export default AppToast;

/** Consistent form feedback copy */
export const toastCopy = {
  requiredStep: "Please fill all required fields in this step.",
  requiredSubmit: "Please complete all required fields before submitting.",
  submitSuccess: "Submitted successfully. We’ll get back to you soon.",
  submitError: "Something went wrong. Please try again.",
  tagEmpty: "Tag cannot be empty.",
  tagDuplicate: "That tag is already added.",
  tagsRequired: "Select at least one property tag.",
  mainImageRequired: "Please upload a main image.",
  galleryMin: "Gallery needs at least 3 images. Select multiple files at once.",
  landlordRequired: "Please enter landlord name and contact.",
} as const;
