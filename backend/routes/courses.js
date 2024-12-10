//backend/routes/courses.js
const express = require("express");
const {
    allCourses,
    allOngoingCoursesFiltered,
    addOngoingCourse,
    addCourse,
    updateCourse,
    deleteCourse,
} = require("../controllers/courseController");

const router = express.Router();

router.get("/allCourses", allCourses);
router.get("/allOngoingCoursesFiltered", allOngoingCoursesFiltered);
router.post("/addOngoingCourse", addOngoingCourse);

router.post("/:studentId/courses", addCourse);
router.put("/:studentId/courses/:courseId", updateCourse);
router.delete("/:studentId/courses/:courseId", deleteCourse);

module.exports = router;
