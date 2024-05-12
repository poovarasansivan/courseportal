import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import CourseList from "./routes/course/getcourse.js";
import Addnewcourse from "./routes/course/addcourse.js";
import Registercourse from "./routes/enrolledcourse/getenroll.js";
import EnrolledCourseDetails from "./routes/enrolledcourse/getindividualcourse.js";
import Updatecoursecompletion from "./routes/course/updatecourse.js";

const app = express();
app.use(express.json());

app.use(cors());

app.use("/getcourse", CourseList);
app.use("/addcourse", Addnewcourse);
app.use("/enrollcourse", Registercourse);
app.use("/getcoursedetails", EnrolledCourseDetails);
app.use("/updatestatus", Updatecoursecompletion);

app.get("/", (request, response) => {
  return response.status(200).send("Welcome");
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is running on Port:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
