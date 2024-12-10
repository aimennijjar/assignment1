//backend/controllers/courseController.js
const courses = require('../data/courseData');
const students = require('../data/studentData');

// Utility function for sending responses
const sendResponse = (res, statusCode, success, msg, data = {}) => {
    res.status(statusCode).json({ success, msg, ...data });
};

// Get all courses
exports.allCourses = async (req, res) => {
    try {
        sendResponse(res, 200, true, "Courses fetched successfully", { courses });
    } catch (error) {
        sendResponse(res, 500, false, "Error fetching courses", { error: error.message });
    }
};

// Get filtered ongoing courses
exports.allOngoingCoursesFiltered = (req, res) => {
    const { open } = req.query;
    const filteredCourses = open !== undefined
        ? courses.filter(course => course.isOpen === (open === 'true'))
        : courses;

    sendResponse(res, 200, true, "Filtered ongoing courses fetched successfully", { courses: filteredCourses });
};

// Add a new ongoing course
exports.addOngoingCourse = (req, res) => {
    const { id, name, department, isOpen } = req.body;

    if (courses.some(course => course.id === id)) {
        return sendResponse(res, 400, false, "Course with the given ID already exists");
    }

    const newCourse = { id, name, department, isOpen };
    courses.push(newCourse);
    sendResponse(res, 201, true, "Ongoing course added successfully", { newCourse });
};

// Enroll a course for a student
exports.addCourse = (req, res) => {
    const { studentId } = req.params;
    const { courseId, courseName, courseDepartment, isOpen } = req.body;

    const student = students.find(s => s.id === parseInt(studentId));
    if (!student) {
        return sendResponse(res, 404, false, "Student not found");
    }

    const newCourse = { id: courseId, name: courseName, department: courseDepartment, isOpen };
    student.enrolledCourses.push(newCourse);

    sendResponse(res, 201, true, "Course added to enrolled list", { course: newCourse });
};

// Update course status
exports.updateCourse = (req, res) => {
    const { studentId, courseId } = req.params;
    const { status } = req.body;

    const student = students.find(s => s.id === parseInt(studentId));
    if (!student) {
        return sendResponse(res, 404, false, "Student not found");
    }

    const moveCourse = (source, destination) => {
        const course = source.find(c => c.id === parseInt(courseId));
        if (!course) return null;

        source = source.filter(c => c.id !== parseInt(courseId));
        destination.push(course);
        return course;
    };

    let course;
    if (status === 'completed') {
        course = moveCourse(student.enrolledCourses, student.completedCourses);
    } else if (status === 'enrolled') {
        course = moveCourse(student.completedCourses, student.enrolledCourses);
    }

    if (!course) {
        return sendResponse(res, 400, false, "Invalid status update or course not found");
    }

    sendResponse(res, 200, true, `Course moved to ${status}`, { course });
};

// Delete a course
exports.deleteCourse = (req, res) => {
    const { studentId, courseId } = req.params;

    const student = students.find(s => s.id === parseInt(studentId));
    if (!student) {
        return sendResponse(res, 404, false, "Student not found");
    }

    student.enrolledCourses = student.enrolledCourses.filter(c => c.id !== parseInt(courseId));
    student.completedCourses = student.completedCourses.filter(c => c.id !== parseInt(courseId));

    sendResponse(res, 200, true, "Course deleted successfully");
};
