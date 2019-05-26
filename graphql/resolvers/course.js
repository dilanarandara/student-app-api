const Course = require("../../models/Course");

module.exports = {
  courses: async () => {
    try {
      let courses = await Course.find({ active: true });
      return courses.map(course => {
        return { ...course._doc, id: course.id };
      });
    } catch (err) {
      throw err;
    }
  }
};
