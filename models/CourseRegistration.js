const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseRegistrationSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student"
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("CourseRegistration", courseRegistrationSchema);
