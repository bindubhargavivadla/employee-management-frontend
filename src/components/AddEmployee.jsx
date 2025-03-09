import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    firstName: "", lastName: "", email: "", position: "", age: "", salary: ""
  });

  const handleChange = (e) => setEmployee({ ...employee, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:5000/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee)
      });
      navigate("/");
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="firstName" onChange={handleChange} placeholder="First Name" required />
      <input type="text" name="lastName" onChange={handleChange} placeholder="Last Name" required />
      <input type="email" name="email" onChange={handleChange} placeholder="Email" required />
      <input type="text" name="position" onChange={handleChange} placeholder="Position" required />
      <input type="number" name="age" onChange={handleChange} placeholder="Age" required />
      <input type="number" name="salary" onChange={handleChange} placeholder="Salary" required />
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default AddEmployee;
