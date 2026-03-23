import Employee from "../models/employee.js";

// CREATE
export const addEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json({ success: true, employee });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ ALL
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ success: true, employees });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Employee Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};