import mongoose from "mongoose";

const { Schema } = mongoose;

const enrolledCourse = new Schema({
  courseId: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  progress: {
    type: Number,
    required: true
  },
});

const EnrolledCourse = mongoose.model("RegisteredCourse", enrolledCourse);

export default EnrolledCourse;
