import React from "react";
import ResetPasswordForm from "../components/ResetPassword/resetPasswordForm";
import useQuery from "../hooks/useQuery";
import { useHistory } from "react-router-dom";

const ResetPassword: React.FC = () => {
  const params = useQuery();
  const history = useHistory();

  if (!params.get("resetToken")) {
    history.replace("/login");
  }

  return (
    <div className="container vh-100">
      <div className="row h-inherit justify-content-center align-items-center">
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPassword;
