import express, { request, response } from "express";
import EnrolledCourse from "./model.js";
const router = express.Router();

router.post("/", async (request, response) => {
  try {
    if (!request.body.courseId || !request.body.name) {
      return response
        .status(400)
        .send({ message: "send all the required feilds" });
    }
    const newRegisteration = {
      courseId: request.body.courseId,
      name: request.body.name,
      progress: request.body.progress,
    };
    const newEnrollment = await EnrolledCourse.create(newRegisteration);
    return response.status(201).send(newEnrollment);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});
export default router;
