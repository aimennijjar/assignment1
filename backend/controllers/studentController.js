//backend/controllers/studentController.js
const students = require('../data/studentData');

// Utility function for sending responses
const sendResponse = (res, statusCode, success, msg, data = {}) => {
    res.status(statusCode).json({ success, msg, ...data });
};

// Fetch all students
exports.allStudents = async (req, res) => {
    try {
        sendResponse(res, 200, true, "Students fetched successfully", { students });
    } catch (error) {
        sendResponse(res, 500, false, "Error fetching students", { error: error.message });
    }
};

// Fetch a single student
exports.singleStudent = async (req, res) => {
    const { id } = req.params;

    try {
        const singleStudent = students.find(student => student.id == id);

        if (singleStudent) {
            const avgGrade = calculateAverageGrade(singleStudent.completedCourses);
            sendResponse(res, 200, true, "Student fetched successfully", {
                ...singleStudent,
                averageGrade: avgGrade,
            });
        } else {
            sendResponse(res, 404, false, "Student not found");
        }
    } catch (error) {
        sendResponse(res, 500, false, "Error fetching student", { error: error.message });
    }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
    const { id } = req.params;

    try {
        const studentIndex = students.findIndex(student => student.id == id);

        if (studentIndex !== -1) {
            students.splice(studentIndex, 1);
            sendResponse(res, 200, true, "Student deleted successfully");
        } else {
            sendResponse(res, 404, false, "Student not found");
        }
    } catch (error) {
        sendResponse(res, 500, false, "Error deleting student", { error: error.message });
    }
};

// Filter students based on query parameters
exports.allStudentsFiltered = (req, res) => {
    const { id, name, department } = req.query;
    let filteredStudents = students;

    if (id) {
        filteredStudents = filteredStudents.filter(student => student.id.toString() === id);
    }

    if (name) {
        filteredStudents = filteredStudents.filter(student =>
            student.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    if (department) {
        filteredStudents = filteredStudents.filter(student =>
            student.department.toLowerCase() === department.toLowerCase()
        );
    }

    sendResponse(res, 200, true, "Filtered students fetched successfully", { students: filteredStudents });
};

// Add a new student
exports.addStudent = (req, res) => {
    const { id, name, department, enrolledCourses = [], completedCourses = [] } = req.body;

    try {
        if (students.some(student => student.id === id)) {
            return sendResponse(res, 400, false, "Student with the given ID already exists");
        }

        const newStudent = { id, name, department, enrolledCourses, completedCourses };
        students.push(newStudent);

        sendResponse(res, 201, true, "Student added successfully", { newStudent });
    } catch (error) {
        sendResponse(res, 500, false, "Error adding student", { error: error.message });
    }
};

// Update student's courses
exports.updateCourse = async (req, res) => {
    const { id } = req.params;
    const { enrolledCourses, completedCourses } = req.body;

    try {
        const student = students.find(student => student.id == id);

        if (!student) {
            return sendResponse(res, 404, false, "Student not found");
        }

        student.enrolledCourses = enrolledCourses;
        student.completedCourses = completedCourses;

        sendResponse(res, 200, true, "Student courses updated successfully", { student });
    } catch (error) {
        sendResponse(res, 500, false, "Error updating student courses", { error: error.message });
    }
};

// Utility function to calculate average grade
const calculateAverageGrade = completedCourses => {
    return completedCourses.length
        ? (completedCourses.length * 4.0) / completedCourses.length
        : 0.0;
};
