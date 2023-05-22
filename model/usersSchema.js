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
  appStatus: {
    type: String,
    enum: ["Accepted", "Rejected", "Pending"],
  },
});

const user = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: Number,
    unique: true,
  },
  password: {
    type: String,
  },
  fullname: {
    type: String,
  },
  about: {
    type: String,
    enum: ["Professor", "B.Tech", "M.Tech", "Ph.D"],
  },
  memberships: [
    {
      field: {
        type: String,
        required: true,
      },
    },
  ],
  areaOfInterest: {
    type: String,
  },
  photo: {
    type: String,
    default:
      "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
  },
  profession: [
    {
      from: {
        type: String,
        required: true,
      },
      to: {
        type: String,
      },
      designation: {
        type: String,
        required: true,
      },
      organisation: {
        type: String,
        required: true,
      },
    },
  ],
  areaOfInterest: {
    type: String,
  },
  honors: [
    {
      award: {
        type: String,
        required: true,
      },
      institute: {
        type: String,
        required: true,
      },
      yearAwarded: {
        type: Number,
        required: true,
      },
    },
  ],
  education: [
    {
      degree: {
        type: String,
        required: true,
      },
      subject: {
        type: String,
        required: true,
      },
      university: {
        type: String,
        required: true,
      },
      yearStudied: {
        type: Number,
        required: true,
      },
    },
  ],
  administrative: [
    {
      from: {
        type: String,
        required: true,
      },
      to: {
        type: String,
      },
      designation: {
        type: String,
        required: true,
      },
      organisation: {
        type: String,
      },
      level: {
        type: String,
      },
    },
  ],
  research: [
    {
      scheme: {
        type: String,
      },
      sponsoringAgency: {
        type: String,
      },
      otherFaculties: {
        type: String,
      },
      yearSponsored: {
        type: Number,
      },
    },
  ],
  teaching: [
    {
      title: {
        type: String,
      },
      courseCode: {
        type: String,
      },
      course: {
        type: String,
      },
      semester: {
        type: String,
      },
    },
  ],

  phdsupervision: [
    {
      topic: {
        type: String,
      },
      scholarName: {
        type: String,
      },
      statusOfPhD: {
        type: String,
      },
      registrationYear: {
        type: Number,
      },
    },
  ],

  shortterm: [
    {
      courseName: {
        type: String,
      },
      sponsoredBy: {
        type: String,
      },
      dateParticipated: {
        type: String,
      },
    },
  ],

  special: [
    {
      title: {
        type: String,
      },
      place: {
        type: String,
      },
      dateDelivered: {
        type: String,
      },
    },
  ],

  seminars: [
    {
      name: {
        type: String,
      },
      place: {
        type: String,
      },
      sponsoredBy: {
        type: String,
      },
      date: {
        type: String,
      },
    },
  ],
  journal: [
    {
      type: {
        type: String,
        enum: ["Patents", "Journals", "Conference"],
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      year: {
        type: Number,
        required: true,
      },
    },
  ],
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
