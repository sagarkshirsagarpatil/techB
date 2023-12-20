import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const AddUser = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [mnumber, setMnumber] = useState("");
  const submit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      address: address,
      number: number,
      customer: mnumber,
    };
    fetch("http://localhost:4000/addCustomer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((data) => {
        return data.json();
      })
      .then((resp) => {
        console.log(resp);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container mt-5 border p-4">
      <form onSubmit={submit}>
        <h5>Add Customer</h5>
        <div className="row">
          <div className="col-6">
            <label className="form-label">Customer Name</label>
            <input
              className="form-control"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
          </div>
          <div className="col-6">
            <label className="form-label">Customer Address</label>
            <input
              className="form-control"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              required
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-6">
            <label className="form-label">Customer Meter Number</label>
            <input
              type="number"
              className="form-control"
              value={number}
              onChange={(e) => {
                setNumber(e.target.value);
              }}
              required
            />
          </div>
          <div className="col-6">
            <label className="form-label"> Customer Number</label>
            <input
              type="number"
              className="form-control"
              value={mnumber}
              onChange={(e) => {
                setMnumber(e.target.value);
              }}
              required
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-6">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default AddUser;
