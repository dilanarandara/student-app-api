const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type Course {
    id: ID!
    name: String!
    active: Boolean!
    startDate: String!
    endDate: String!
    availableSeats: Int!
    maximumSeats: Int!
}

type Student {
    id: ID!
    firstName: String!
    lastName: String!
    age: Int!
    email: String!
    courses: [Course]!
}

type CourseRegistration {
    id: ID!
    student: Student
    course: Course
}

input UserInput {
    firstName: String!
    lastName: String!
    age: Int!
    email: String!
    password: String!
}

type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

type RootQuery {
    courses: [Course!]!
    courseRegistrations: [CourseRegistration!]!
    login(email: String!, password: String!): AuthData!
    courseRegistrationByStudent: [CourseRegistration!]!
}

type RootMutation {
    registerCourse(courseId: ID!): CourseRegistration!
    createStudent(userInput: UserInput!): Student!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
