import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [employee, setEmployee] = useState({ firstName: "", lastName: "", email: "", position: "", age: "", salary: "" });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/employees");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleOpen = (emp = null) => {
    setEditMode(!!emp);
    setEmployee(emp || { firstName: "", lastName: "", email: "", position: "", age: "", salary: "" });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => setEmployee({ ...employee, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editMode ? `http://localhost:5000/api/employees/${employee.id}` : "http://localhost:5000/api/employees";
      const method = editMode ? "PUT" : "POST";
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
      });
      fetchEmployees();
      handleClose();
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await fetch(`http://localhost:5000/api/employees/${id}`, { method: "DELETE" });
      setEmployees(employees.filter(emp => emp.id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Employee List</h2>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>Add Employee</Button>
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map(emp => (
              <TableRow key={emp.id}>
                <TableCell>{emp.firstName} {emp.lastName}</TableCell>
                <TableCell>{emp.email}</TableCell>
                <TableCell>{emp.position}</TableCell>
                <TableCell>{emp.age}</TableCell>
                <TableCell>${emp.salary}</TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => handleOpen(emp)}>Edit</Button>
                  <Button color="secondary" onClick={() => handleDelete(emp.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? "Update Employee" : "Add Employee"}</DialogTitle>
        <DialogContent>
          <TextField name="firstName" label="First Name" fullWidth margin="dense" value={employee.firstName} onChange={handleChange} required />
          <TextField name="lastName" label="Last Name" fullWidth margin="dense" value={employee.lastName} onChange={handleChange} required />
          <TextField name="email" label="Email" fullWidth margin="dense" value={employee.email} onChange={handleChange} required />
          <TextField name="position" label="Position" fullWidth margin="dense" value={employee.position} onChange={handleChange} required />
          <TextField name="age" label="Age" type="number" fullWidth margin="dense" value={employee.age} onChange={handleChange} required />
          <TextField name="salary" label="Salary" type="number" fullWidth margin="dense" value={employee.salary} onChange={handleChange} required />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">{editMode ? "Update" : "Add"}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployeeList;
