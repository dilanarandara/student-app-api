const DataLoader = require("dataloader");

const Course = require("../../models/Course");
const Student = require("../../models/Student");

const studentLoader = new DataLoader(studentIds => {
  return Student.find({ _id: { $in: studentIds } });
});

const courseLoader = new DataLoader(courseIds => {
  return Course.find({ _id: { $in: courseIds } });
});

const singleStudent = async studentId => {
  try {
    const obj = await studentLoader.load(studentId.toString());
    return { ...obj._doc, id: obj.id };
  } catch (err) {
    throw err;
  }
};

const singleCourse = async courseId => {
  try {
    const obj = await courseLoader.load(courseId.toString());
    return transformCourse(obj);
  } catch (err) {
    throw err;
  }
};

const transformCourse = course => {
  return {
    ...course._doc,
    id: course.id,
    students: course.students.map(id => {
      return singleStudent(id);
    })
  };
};

const transformCourseRegistration = courseRegistration => {
  return {
    ...courseRegistration._doc,
    id: courseRegistration.id,
    student: singleStudent.bind(this, courseRegistration.student),
    course: singleCourse.bind(this, courseRegistration.course)
  };
};

exports.transformCourseRegistration = transformCourseRegistration;
