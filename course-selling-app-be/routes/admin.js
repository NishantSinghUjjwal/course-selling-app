const express = require('express');
const { Course, Admin } = require('../db');
const { ObjectId } = require('bson');
const { authenticateAdmin, generateJWT } = require('../middlewares/auth');
router = express.Router()



// Admin routes
router.post('/signup', async (req, res) => {
    // logic to sign up admin
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username })
    if (admin) {
        return res.status(409).send({ message: "Admin already exists" })
    } else {
        const admin = new Admin({ username, password })
        admin.save()
        const token = generateJWT({ username, role: 'admin' }, process.env.ADMIN_SECRET)
        console.log("token", token);
        return res.status(201).send({ message: "Admin created successfully", token })
    }

});

router.get("/me", authenticateAdmin, (req, res) => {
    return res.status(200).send({ user: req.user, status: "ok" })
})
router.post('/login', (req, res) => {
    // logic to log in admin
    const { username, password } = req.headers;
    const admin = Admin.findOne({ username })
    if (admin) {
        const token = generateJWT({ username, role: 'admin' }, process.env.ADMIN_SECRET)
        return res.status(200).send({ message: "Logged in successfully", token })
    } else return res.status(404).send({ message: "Admin not found" })


});

router.post('/courses', authenticateAdmin, async (req, res) => {
    try {

        // logic to create a course
        const course = req.body;
        const createdCourse = new Course(course);
        createdCourse.save()
        return res.status(201).send({ message: "Course created successfully", courseId: createdCourse._id })
    } catch (err) {
        return res.status(500).send({ message: "Something went wrong" })
    }

});

router.put('/courses/:courseId', authenticateAdmin, async (req, res) => {
    // logic to edit a course
    try {
        const courseId = (req.params.courseId);
        console.log("course id", courseId)
        const newCourse = req.body;
        console.log("new course", newCourse)
        const updatedCourse = await Course.findByIdAndUpdate((courseId), newCourse, { new: true });
        if (updatedCourse) {
            return res.status(200).send({ message: "Course updated successfully", courseId })
        } else {
            console.log(updatedCourse)
            return res.status(500).send({ message: "Unable to update course" })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: "Something went wrong" })
    }
});

router.get('/courses', authenticateAdmin, async (req, res) => {
    // logic to get all courses
    const courses = await Course.find({})
    return res.status(200).send({ courses })
});

router.get('/course/:courseId', authenticateAdmin, async (req, res) => {
    // logic to get all courses
    const course = await Course.findById(new ObjectId(req.params.courseId))
    return res.status(200).send({ course })
});

exports.adminRouter = router