import express from "express";
import CourseDetails from "../course/model.js";

const router = express.Router();

router.get("/:id", async (request, response) => {
  try {
    const courseId = request.params.id;

    const courseDetails = await CourseDetails.findOne({ courseId: courseId });

    if (courseDetails) {
      response.json(courseDetails);
    } else {
      response.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
