//client/src/components/addStudent.js

import React, { useState } from 'react';

const AddStudentForm = ({ onAdd }) => {
    const [formData, setFormData] = useState({
        studentName: '',
        id: '',
        department: '',
        semester: '',
        enrolledCourses: '',
        completedCourses: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { id, studentName, department, semester, enrolledCourses, completedCourses } = formData;

        if (id && studentName && department && semester && enrolledCourses && completedCourses) {
            const newStudent = {
                id,
                name: studentName,
                department,
                semester,
                enrolledCourses: enrolledCourses.split(',').map((course) => course.trim()),
                completedCourses: completedCourses.split(',').map((course) => course.trim()),
            };

            onAdd(newStudent);
            setFormData({
                studentName: '',
                id: '',
                department: '',
                semester: '',
                enrolledCourses: '',
                completedCourses: '',
            });
        }
    };

    return (
        <div className="add-student-form">
            <h2>Add a New Student</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="studentName"
                    placeholder="Student Name"
                    value={formData.studentName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="id"
                    placeholder="Student ID"
                    value={formData.id}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="semester"
                    placeholder="Semester"
                    value={formData.semester}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="enrolledCourses"
                    placeholder="Enrolled Courses (comma-separated)"
                    value={formData.enrolledCourses}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="completedCourses"
                    placeholder="Completed Courses (comma-separated)"
                    value={formData.completedCourses}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add Student</button>
            </form>
        </div>
    );
};

export default AddStudentForm;
