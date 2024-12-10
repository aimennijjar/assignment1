//client/src/components/addCourse.js
import React, { useState } from 'react';

const AddCourseForm = ({ onAdd }) => {
    const [formData, setFormData] = useState({
        courseId: '',
        courseName: '',
        department: '',
        isOpen: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { courseId, courseName, department, isOpen } = formData;

        if (courseId && courseName && department) {
            const newCourse = { id: courseId, name: courseName, department, isOpen };
            onAdd(newCourse);
            setFormData({ courseId: '', courseName: '', department: '', isOpen: false });
        }
    };

    return (
        <div className="add-course-form">
            <h2>Add a New Course</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="courseName"
                    placeholder="Course Name"
                    value={formData.courseName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="courseId"
                    placeholder="Course ID"
                    value={formData.courseId}
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
                <label>
                    <input
                        type="checkbox"
                        name="isOpen"
                        checked={formData.isOpen}
                        onChange={handleChange}
                    />
                    Open Course?
                </label>
                <button type="submit">Add Course</button>
            </form>
        </div>
    );
};

export default AddCourseForm;
