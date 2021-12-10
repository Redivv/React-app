import React from "react";
import LoginForm from "../components/UserForms/Login/LoginForm/LoginForm";
import LoginHeader from "../components/UserForms/Login/LoginHeader/LoginHeader";

const Login: React.FC = () => {
  return (
    <div className="container vh-100">
      <div className="row h-inherit justify-content-center align-items-center">
        <LoginHeader />
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
