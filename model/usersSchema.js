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
});

// console.log(user.methods);
const User = mongoose.model("User", user);
const Resource = mongoose.model("Resource", resourcesShcema);
const Publication = mongoose.model("Publication", publicationsShcema);
const Project = mongoose.model("Project", projectsShcema);
module.exports = { User, Resource, Publication, Project };
