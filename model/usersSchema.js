const mongoose = require("mongoose");

const resourcesShcema = new mongoose.Schema({
  docname: {
    type: String,
  },
  docType: {
    type: String,
  },
  docDesc: {
    type: String,
  },
  docLink: {
    type: String,
  },
  docOwner: {
    type: String,
    ref: "User",
  },
});
const publicationsShcema = new mongoose.Schema({
  docname: {
    type: String,
  },
  docType: {
    type: String,
  },
  docDesc: {
    type: String,
  },
  docLink: {
    type: String,
  },
  docOwner: {
    type: String,
    ref: "User",
  },
});
const projectsShcema = new mongoose.Schema({
  docname: {
    type: String,
  },
  docType: {
    type: String,
  },
  docDesc: {
    type: String,
  },
  docLink: {
    type: String,
  },
  docOwner: {
    type: String,
    ref: "User",
  },
});
const leaveAppSchema = new mongoose.Schema({
  appType: {
    type: String,
  },
  appDesc: {
    type: String,
  },
  appOwner: {
    type: String,
    ref: "User",
  },
});

const user = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  fullname: {
    type: String,
  },
  about: {
    type: String,
  },
  areaOfInterest: {
    type: String,
  },
  photo: {
    type: String,
  },
  resources: [resourcesShcema],
  publications: [publicationsShcema],
  projects: [projectsShcema],
  leaveApplications: [leaveAppSchema],
});

// console.log(user.methods);
const User = mongoose.model("User", user);
const Resource = mongoose.model("Resource", resourcesShcema);
const Publication = mongoose.model("Publication", publicationsShcema);
const Project = mongoose.model("Project", projectsShcema);
const LeaveApp = mongoose.model("LeaveApp", leaveAppSchema);
module.exports = { User, Resource, Publication, Project, LeaveApp };
