const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    availableSeats: {
      type: Number,
      required: true
    },
    maximumSeats: {
      type: Number,
      required: true
    },
    active: {
      type: Boolean,
      required: true
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
