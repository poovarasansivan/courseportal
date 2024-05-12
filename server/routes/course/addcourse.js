import express from "express";
import CourseDetails from "./model.js";

const router = express.Router();

router.post("/", async (request, response) => {
  try {
    if (!Array.isArray(request.body)) {
      return response
        .status(400)
        .send({ message: "Request body must be an array of objects" });
    }

    const newCourses = [];

    for (const course of request.body) {
      if (
        !course.courseId ||
        !course.name ||
        !course.instructor ||
        !course.description ||
        !course.thumbnail ||
        !course.duration ||
        !course.schedule ||
        !course.location ||
        !course.enrollment ||
        !course.prerequisites
      ) {
        return response
          .status(400)
          .send({
            message: "Each course object must include all the required fields",
          });
      }

      const newCourse = {
        courseId: course.courseId,
        name: course.name,
        instructor: course.instructor,
        description: course.description,
        thumbnail: course.thumbnail,
        duration: course.duration,
        schedule: course.schedule,
        location: course.location,
        enrollment: course.enrollment,
        prerequisites: course.prerequisites,
        syllabus: course.syllabus || [],
      };

      newCourses.push(newCourse);
    }


    const createdCourses = await CourseDetails.create(newCourses);

    return response.status(201).send(createdCourses);
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
});

export default router;
