import React, { useState } from "react";
import Layout from "../../../components/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';

export const Aform = () => {
  const formArray = [1, 2, 3];
  const [formNo, setFormNo] = useState(formArray[0]);
  const [state, setState] = useState({
    name: "",
    dept: "",
    batch: "",
    varsity: "",
    session: "",
    address: "",
    district: "",
    thana: "",
    post: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const next = () => {
    setFormNo(formNo + 1);
  };

  const pre = () => {
    setFormNo(formNo - 1);
  };

  const finalSubmit = () => {
    toast.success("Form submit success");
  };

  return (
    <Layout>
      <div className="flex justify-center items-center p-4">
        <ToastContainer />

        <div className="card w-96 rounded-md shadow-md bg-white p-1">
          <div className="text-center text-lg font-bold">Doctor Booking</div>
          <div className="flex justify-center items-center">
            {formArray.map((v, i) => (
              <React.Fragment key={i}>
                <div
                  className={`w-[35px] my-3 text-white rounded-full ${
                    formNo - 1 === i ||
                    formNo - 1 === i + 1 ||
                    formNo === formArray.length
                      ? "bg-blue-500"
                      : "bg-slate-400"
                  } h-[35px] flex justify-center items-center`}
                >
                  {v}
                </div>
                {i !== formArray.length - 1 && (
                  <div
                    className={`w-[85px] h-[2px] ${
                      formNo === i + 2 || formNo === formArray.length
                        ? "bg-blue-500"
                        : "bg-slate-400"
                    }`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
          {formNo === 1 && (
            <div>
              <div className="flex flex-col mb-2">
                <label htmlFor="date">Date</label>
                <input
                  value={state.date}
                  onChange={inputHandle}
                  className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                  type="date"
                  name="date"
                  id="date"
                />
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="time">Time</label>
                <input
                  value={state.time}
                  onChange={inputHandle}
                  className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                  type="time"
                  name="time"
                  id="time"
                />
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="doctor">Doctor</label>
                <input
                  value={state.doctor}
                  onChange={inputHandle}
                  className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                  type="text"
                  name="doctor"
                  placeholder="Doctor's name"
                  id="doctor"
                />
              </div>
              <div className="mt-4 flex justify-center items-center">
                <button
                  onClick={next}
                  className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500"
                >
                  Next
                </button>
              </div>
            </div>
          )}

{formNo === 2 && (
  <div>
    <div className="flex flex-col mb-2">
      <label className="text-slate-500" htmlFor="patientName">
        Patient Name
      </label>
      <input
        value={state.patientName}
        onChange={inputHandle}
        className="p-2 border border-slate-400 mt-1 outline-0 text-slate-500 focus:border-blue-500 rounded-md"
        type="text"
        name="patientName"
        placeholder="Patient Name"
        id="patientName"
      />
    </div>
    <div className="flex flex-col mb-2">
      <label className="text-slate-500" htmlFor="contactNumber">
        Contact Number
      </label>
      <input
        value={state.contactNumber}
        onChange={inputHandle}
        className="p-2 border border-slate-400 mt-1 outline-0 text-slate-500 focus:border-blue-500 rounded-md"
        type="tel"
        name="contactNumber"
        placeholder="Contact Number"
        id="contactNumber"
      />
    </div>
    <div className="flex flex-col mb-2">
      <label className="text-slate-500" htmlFor="age">
        Age
      </label>
      <input
        value={state.age}
        onChange={inputHandle}
        className="p-2 border border-slate-400 mt-1 outline-0 text-slate-500 focus:border-blue-500 rounded-md"
        type="number"
        name="age"
        placeholder="Age"
        id="age"
      />
    </div>
    <div className="flex flex-col mb-2">
      <label className="text-slate-500" htmlFor="address">
        Address
      </label>
      <textarea
        value={state.address}
        onChange={inputHandle}
        rows="5" // Adjust the number of rows as needed
        className="p-2 border border-slate-400 mt-1 outline-0 text-slate-500 focus:border-blue-500 rounded-md"
        name="address"
        placeholder="Address"
      ></textarea>
    </div>
    <div className="flex flex-col mb-2">
      <label className="text-slate-500" htmlFor="email">
        Email
      </label>
      <input
        value={state.email}
        onChange={inputHandle}
        className="p-2 border border-slate-400 mt-1 outline-0 text-slate-500 focus:border-blue-500 rounded-md"
        type="email"
        name="email"
        placeholder="Email"
        id="email"
      />
    </div>
    <div className="mt-4 gap-3 flex justify-center items-center">
      <button
        onClick={pre}
        className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500"
      >
        Previous
      </button>
      <button
        onClick={next}
        className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500"
      >
        Next
      </button>
    </div>
  </div>
)}

{formNo === 3 && (
  <div>
    <div className="flex flex-col mb-2">
      <label htmlFor="paymentMethod">Payment Method</label>
      <select
        value={state.paymentMethod}
        onChange={inputHandle}
        className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
        name="paymentMethod"
        id="paymentMethod"
      >
        <option value="cash">Cash Payment</option>
        <option value="online">Pay Online</option>
      </select>
    </div>
    <div className="mt-4 gap-3 flex justify-center items-center">
    <Link to="/payment">
      <button
        onClick={pre}
        className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500"
      >
       Pay Now
      </button>
      </Link>
  
    </div>
  </div>
)}
        </div>
      </div>
    </Layout>
  );
};
