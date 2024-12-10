//app.js
import { useEffect, useState } from 'react';
import './App.css';
import AddCourseForm from './components/addCourse';
import CourseList from './components/courseList';
import StudentList from './components/studentList';
import AddStudentForm from './components/addStudent';
import { addStudent, deleteStudent, fetchStudents } from './api';

const App = () => {
  const initialCourses = [
    { id: 1, name: "Data Structures", department: "Computer Science", isOpen: true },
    { id: 2, name: "Linear Algebra", department: "Mathematics", isOpen: true },
    { id: 3, name: "Organic Chemistry", department: "Chemistry", isOpen: false },
  ];

  const initialStudents = [
    {
      id: 1,
      name: 'Alice',
      department: 'Computer Science',
      semester: 3,
      enrolledCourses: ['Data Structures'],
      completedCourses: [],
    },
  ];

  const [courses, setCourses] = useState(initialCourses);
  const [students, setStudents] = useState(initialStudents);
  const [error, setError] = useState(null);

  // Fetch dynamic students from backend
  const fetchDynamicStudents = async () => {
    try {
      const data = await fetchStudents();
      setStudents([...initialStudents, ...data.students]); // Combine local and backend data
    } catch (err) {
      setError('Failed to fetch students.');
    }
  };

  useEffect(() => {
    fetchDynamicStudents();
  }, []);

  const handleAddCourse = (newCourse) => {
    setCourses([...courses, newCourse]);
  };

  const handleAddDynamicStudent = async (newStudent) => {
    try {
      const response = await addStudent(newStudent);
      if (response.success) {
        setStudents((prevStudents) => [...prevStudents, response.newStudent]); // Add new student
      } else {
        console.error('Failed to add student:', response.message);
      }
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleDeleteDynamicStudent = async (studentId) => {
    try {
      const response = await deleteStudent(studentId);
      if (response.success) {
        setStudents((prevStudents) =>
          prevStudents.filter((student) => student.id !== studentId)
        ); // Remove student locally
      } else {
        console.error('Failed to delete student:', response.message);
      }
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleCompleteCourse = (studentId, courseName) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) => {
        if (student.id === studentId) {
          const updatedEnrolled = student.enrolledCourses.filter(
            (course) => course !== courseName
          );
          const updatedCompleted = [...student.completedCourses, courseName];
          return {
            ...student,
            enrolledCourses: updatedEnrolled,
            completedCourses: updatedCompleted,
          };
        }
        return student;
      })
    );
  };

  return (
    <div className="App">
      <CourseList courses={courses} />
      <AddCourseForm onAdd={handleAddCourse} />
      <StudentList
        students={students}
        onDelete={handleDeleteDynamicStudent}
        onCompleteCourse={handleCompleteCourse}
      />
      <AddStudentForm onAdd={handleAddDynamicStudent} />
    </div>
  );
};

export default App;
