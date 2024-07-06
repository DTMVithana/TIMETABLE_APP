import React, { useState } from "react";
import "../styles/RegiserStyles.css";
import { Form, Input, message, Radio } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

const Login = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const dispatch = useDispatch();
  const [selectedRole, setSelectedRole] = useState(null);

  // Form submission handler
  const onFinishHandler = async (values) => {
    const { email, password } = values;
    if (email === "Ann@gmail.com" && password === "ann123") {
      // Redirect to special page for hardcoded user
      navigate("/hello-teacher");
      return;
    }

    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", {
        ...values,
        role: selectedRole,
      });
      dispatch(hideLoading());

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/dashboard");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
      message.error("Something went wrong");
    }
  };

  return (
    <div className="form-container ">
      <Form
        layout="vertical"
        onFinish={onFinishHandler}
        className="register-form"
      >
        <h3 className="text-center">Login From</h3>

        <Form.Item label="Email" name="email">
          <Input type="email" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>
        <Form.Item label="Select Role" name="role">
          <Radio.Group onChange={(e) => setSelectedRole(e.target.value)}>
            <Radio value="student">Student</Radio>
            <Radio value="lecturer">Lecturer</Radio>
          </Radio.Group>
        </Form.Item>
        <Link to="/register" className="m-2">
          Not a user? Register here
        </Link>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </Form>
    </div>
  );
};

export default Login;
