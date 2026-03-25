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

// UPDATE Employee Details
// In backend/controllers/employeeController.js

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, position, salary } = req.body;

    // USE THIS METHOD: It bypasses the 'unique' check for the SAME record
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { firstName, lastName, email, position, salary },
      { new: true, runValidators: true } 
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ success: true, employee: updatedEmployee });
  } catch (error) {
    // Check for MongoDB Duplicate Key Error (Code 11000)
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: "This email is already in use by another employee." 
      });
    }
    res.status(500).json({ message: "Server error during update" });
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