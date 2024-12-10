//client/src/components/courseList.js
import React from 'react';

const CourseList = ({ courses }) => {
    return (
        <div className="course-list">
            <h2>Course List</h2>
            {courses.length === 0 ? (
                <p>No courses available.</p>
            ) : (
                <table className="course-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={course.id}>
                                <td>{course.id}</td>
                                <td>{course.name}</td>
                                <td>{course.department}</td>
                                <td>{course.isOpen ? 'Open' : 'Closed'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CourseList;
