import React from "react";
import LoginForm from "../components/Login/LoginForm/LoginForm";
import LoginHeader from "../components/Login/LoginHeader/LoginHeader";

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
