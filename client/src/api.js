//api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:2000/api';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Generic function for error handling
const handleApiError = (error, message) => {
    console.error(`${message}:`, error);
    throw error;
};

// Fetch all courses
export const fetchCourses = async () => {
    try {
        const response = await api.get('/allCourses');
        return response.data;
    } catch (error) {
        handleApiError(error, 'Error fetching courses');
    }
};

// Fetch all students
export const fetchStudents = async () => {
    try {
        const response = await api.get('/allStudents');
        return response.data;
    } catch (error) {
        handleApiError(error, 'Error fetching students');
    }
};

// Add a new student
export const addStudent = async (data) => {
    try {
        const response = await api.post('/addStudent', data);
        return response.data;
    } catch (error) {
        handleApiError(error, 'Error adding student');
    }
};

// Delete a student
export const deleteStudent = async (id) => {
    try {
        const response = await api.delete(`/deleteStudent/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(error, 'Error deleting student');
    }
};

// Update courses for a student
export const updateCourse = async (id, data) => {
    try {
        const response = await api.patch(`/updateCourse/${id}`, data);
        return response.data;
    } catch (error) {
        handleApiError(error, 'Error updating courses');
    }
};
