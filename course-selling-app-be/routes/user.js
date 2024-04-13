const express = require('express');
const { User, Course } = require('../db');
const { authenticateUser } = require('../middlewares/auth');
router = express.Router()


router.post('/signup', async (req, res) => {
    // logic to sign up user
    try {

        const { username, password } = req.body;
        const user = await User.findOne({ username })
        if (user) {
            return res.status(409).send({ message: "User already exists" })
        } else {
            const user = new User({ username, password })
            user.save()
            const token = generateJWT({ username, role: 'user' }, process.env.USER_SECRET)
            console.log("token", token);
            return res.status(201).send({ message: "User created successfully", token })
        }
    } catch (err) {
        return res.status(500).send({ message: "Something went wrong" })
    }
});

router.post('/login', (req, res) => {
    // logic to log in user
    const { username, password } = req.headers;
    const user = User.findOne({ username, password })
    if (user) {
        const token = generateJWT({ username, role: 'user' }, process.env.USER_SECRET)
        return res.status(200).send({ message: "Logged in successfully", token })
    } else return res.status(404).send({ message: "User not found" })

});

router.get('/courses', authenticateUser, async (req, res) => {
    // logic to list all courses
    try {

        const user = await User.findOne({ username: req.user })
        if (user) {

            return res.status(200).send({ courses: user.purchasedCourses })
        } else return res.status(404).send({ message: "user not found" })
    } catch (err) {
        return res.status(500).send({ message: "Something went wrong" })
    }

});

router.post('/courses/:courseId', authenticateUser, async (req, res) => {
    // logic to purchase a course
    try {
        const course = await Course.findById(req.params.courseId)
        console.log(course)
        if (course) {
            const user = await User.findOne({ username: req.user });
            if (user) {

                user.purchasedCourses.push(course);
                await user.save()
                return res.status(200).send({ message: "Course purchased successfully", courseId: req.params.courseId })
            } else {
                res.status(403).json({ message: 'User not found' });
            }
        } else return res.status(404).send({ message: "No such course found" })

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Something went wrong" })
    }
});

router.get('/purchasedCourses', (req, res) => {
    // logic to view purchased courses
});

exports.userRouter = router;