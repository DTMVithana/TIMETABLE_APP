import React, { useState } from "react";
import { Form, Input, message, Radio } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userRole, setUserRole] = useState(null);

  // Form submission handler
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      // Send registration request to the server
      const res = await axios.post("/api/v1/user/register", {
        ...values,
        role: userRole,
      });
      dispatch(hideLoading());

      if (res.data.success) {
        message.success("Registration successful");
        navigate("/login");
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
    <div className="form-container">
      <Form layout="vertical" onFinish={onFinishHandler}>
        <h1>Register Form</h1>
        <Form.Item label="Name" name="name">
          <Input type="text" required />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input type="email" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>
        <Form.Item label="Select User Role" name="role">
          <Radio.Group onChange={(e) => setUserRole(e.target.value)}>
            <Radio value="faculty">Faculty</Radio>
            <Radio value="student">Student</Radio>
          </Radio.Group>
        </Form.Item>

        <Link to="/login">Already a user? Login here</Link>
        <button className="btn btn-primary" type="submit">
          Register
        </button>
      </Form>
    </div>
  );
};

export default Register;
