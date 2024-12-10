// backend/models/Course.js
class OngoingCourse {
    constructor(id, name, department, isOpen) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.isOpen = isOpen;
    }
}

module.exports = OngoingCourse;
