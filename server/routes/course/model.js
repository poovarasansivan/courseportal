import mongoose from "mongoose";

const { Schema } = mongoose;

const courseSchema = new Schema({
  courseId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  schedule: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  enrollment: {
    type: String,
    required: true,
  },
  progress: {
    type: Number,
    required: false,
  },
  prerequisites: {
    type: [String],
    required: false,
  },
  syllabus: {
    type: [
      {
        week: {
          type: Number,
          required: true,
        },
        topic: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
      },
    ],
    required: true,
  },
});

const CourseDetails = mongoose.model("CourseDetails", courseSchema);

export default CourseDetails;
