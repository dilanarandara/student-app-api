const CourseRegistration = require("../../models/CourseRegistration");
const Student = require("../../models/Student");
const Course = require("../../models/Course");
const { transformCourseRegistration } = require("./merge");

module.exports = {
  courseRegistrations: async (_, req) => {
    try {
      const courseRegistrations = await CourseRegistration.find();
      return courseRegistrations.map(courseRegistration => {
        return transformCourseRegistration(courseRegistration);
      });
    } catch (err) {
      throw err;
    }
  },
  registerCourse: async (arg, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("Unauthenticated!");
      }

      let course = await Course.findById(arg.courseId);

      if (!course) {
        throw new Error("Invalid Course Id");
      }

      let hasRegistered = await CourseRegistration.findOne({
        student: req.userId,
        course: arg.courseId
      });

      if (hasRegistered) {
        throw new Error("Student has already registered with the Course.");
      }

      let courseRegistration = new CourseRegistration({
        student: req.userId,
        course: arg.courseId
      });

      const result = await courseRegistration.save();

      // ASynchronously update student and course collections
      // with mapping course ID and student ID
      Student.findById(req.userId)
        .then(obj => {
          obj.courses.push(arg.courseId);
          return obj.save();
        })
        .then(obj => {
          course.students.push(req.userId);
          return course.save();
        })
        .catch(err => {
          // Log the error message into a log file.
          console.log(err);
        });
      return { ...result, id: result.id };
    } catch (err) {
      throw err;
    }
  },
  courseRegistrationByStudent: async (_, req) => {
    try {
      console.log(req.isAuth);
      if (!req.isAuth) {
        throw new Error("Unauthenticated!");
      }

      const courseRegistrations = await CourseRegistration.find({
        student: req.userId
      });

      return courseRegistrations.map(courseRegistration => {
        return { ...courseRegistration, id: courseRegistration.id };
      });
    } catch (err) {
      throw err;
    }
  }
};
