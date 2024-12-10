const express = require('express');
const {
    allStudents,
    singleStudent,
    addStudent,
    updateCourse,
    deleteStudent,
} = require('../controllers/studentController');

const router = express.Router();

router.get('/allStudents', allStudents);
router.get('/students/:id', singleStudent);
router.post('/addStudent', addStudent);
router.patch('/updateCourse/:id', updateCourse);
router.delete('/deleteStudent/:id', deleteStudent);

module.exports = router;
