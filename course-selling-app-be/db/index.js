const mongoose = require('mongoose')

//mongodb schemas
const adminSchema = new mongoose.Schema({
    username: String,
    password: String
})
const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
})

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
})
//mongodb models
const Admin = mongoose.model('Admin', adminSchema)
const Course = mongoose.model('Course', courseSchema)
const User = mongoose.model('User', userSchema)

module.exports = {
    Admin,
    Course,
    User
}