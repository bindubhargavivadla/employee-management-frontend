import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({ firstName: "", lastName: "", email: "", position: "", age: "", salary: "" });

  useEffect(() => {
    fetch(`http://localhost:5000/api/employees/${id}`)
      .then(res => res.json())
      .then(data => setEmployee(data))
      .catch(error => console.error("Error fetching employee:", error));
  }, [id]);

  const handleChange = (e) => setEmployee({ ...employee, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee)
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="firstName" value={employee.firstName} onChange={handleChange} required />
      <button type="submit">Update Employee</button>
    </form>
  );
};

export default UpdateEmployee;
