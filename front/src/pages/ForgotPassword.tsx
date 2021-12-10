import React from "react";
import ForgotPasswordForm from "../components/UserForms/ForgotPassword/ForgotPasswordForm";
const ForgotPassword: React.FC = () => {
  return (
    <div className="container vh-100">
      <div className="row h-inherit justify-content-center align-items-center">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPassword;
