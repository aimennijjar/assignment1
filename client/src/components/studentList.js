//client/src/components/studentList.js
import React from 'react';

const StudentList = ({ students, onDelete, onCompleteCourse }) => {
    return (
        <div className="student-list">
            <h2>Student List</h2>
            {students.length === 0 ? (
                <p>No students available.</p>
            ) : (
                <table className="student-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Semester</th>
                            <th>Enrolled Courses</th>
                            <th>Completed Courses</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.department}</td>
                                <td>{student.semester}</td>
                                <td>
                                    {student.enrolledCourses.length > 0 ? (
                                        student.enrolledCourses.map((course, index) => (
                                            <div key={index}>
                                                {course}
                                                <button
                                                    onClick={() =>
                                                        onCompleteCourse(student.id, course)
                                                    }
                                                    className="complete-button"
                                                >
                                                    Mark Completed
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        'No courses enrolled'
                                    )}
                                </td>
                                <td>
                                    {student.completedCourses.length > 0
                                        ? student.completedCourses.join(', ')
                                        : 'No courses completed'}
                                </td>
                                <td>
                                    <button onClick={() => onDelete(student.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default StudentList;
