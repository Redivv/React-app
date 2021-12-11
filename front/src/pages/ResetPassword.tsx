import React from "react";
import useQuery from "../hooks/useQuery";
import { useHistory } from "react-router-dom";
import ResetPasswordForm from "../components/UserForms/ResetPassword/ResetPasswordForm";

const ResetPassword: React.FC = () => {
  const params = useQuery();
  const history = useHistory();

  if (!params.get("token") || !params.get("email")) {
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
