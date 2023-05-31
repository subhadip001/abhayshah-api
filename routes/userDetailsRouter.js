const express = require("express");
const {
  User,
  Publication,
  Project,
  LeaveApp,
} = require("../model/usersSchema");
const { Resource } = require("../model/usersSchema");
const bodyParser = require("body-parser");
const router = express.Router();

router.use(bodyParser.json());

// Get all user details
router.get("/userdetails", async (req, res) => {
  try {
    const userDetails = await User.find();
    //console.log(userDetails);
    res.json(userDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/userfullnames", async (req, res) => {
  try {
    const userDetails = await User.find(
      {},
      { fullname: 1, username: 1, _id: 0, about: 1 }
    );
    //console.log(userDetails);
    res.json(userDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/userdetails/:id", async (req, res) => {
  const params = req.params;
  //console.log(params);
  try {
    const userDetails = await User.findOne({ username: params.id });
    //console.log(userDetails);
    res.json(userDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/getUserdetailsByUsername", async (req, res) => {
  const { username } = req.body;
  try {
    const userDetails = await User.findOne({ username: username });
    //console.log(userDetails);
    res.json(userDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single user's details by their user ID
router.get("/userdetails/:userId", async (req, res) => {
  try {
    const userDetails = await User.findOne({
      userId: req.params.userId,
    });
    res.json(userDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new user's details
router.post("/userdetails", async (req, res) => {
  const userDetails = new User({
    userId: req.body.userId,
    fullName: req.body.fullName,
    photo: req.body.photo,
    profession: req.body.profession,
    areaOfInterest: req.body.areaOfInterest,
  });

  try {
    const newUserDetails = await userDetails.save();
    res.status(201).json(newUserDetails);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//update a old user's details

router.post("/updateUserdetails", async (req, res) => {
  const { username, data } = req.body;
  try {
    const userDetails = await User.findOneAndUpdate(
      { username },
      { $set: { ...data } },
      { new: true }
    );
    res.status(200).json(userDetails);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating user details" });
  }
});

// add a new resource of a user

router.post("/addResource", async (req, res) => {
  const { username, docname, docType, docDesc, docLink } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    // Add the new resource to the user's resources array

    const resource = new Resource({
      docname: docname,
      docType: docType,
      docDesc: docDesc,
      docOwner: username,
      docLink: docLink,
    });

    user.resources.push({
      docname: docname,
      docType: docType,
      docDesc: docDesc,
      docOwner: username,
      docLink: docLink,
    });

    // Save the updated user document
    const newResource = await resource.save();
    const updatedUser = await user.save();
    console.log(newResource);
    console.log(updatedUser);

    res.json({ success: true, message: "Resource added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get("/getAllPublicResorces", async (req, res) => {
  try {
    const resources = await Resource.find({ docType: "public" });
    res.status(201).json(resources);
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
});

router.post("/getResourcesByUsername", async (req, res) => {
  try {
    const { username } = req.body;
    const resources = await Resource.find({ docOwner: username });

    console.log(resources);
    res.status(201).json(resources);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/addPublications", async (req, res) => {
  const { username, docname, docType, docDesc, docLink } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    // Add the new resource to the user's resources array

    const publication = new Publication({
      docname: docname,
      docType: docType,
      docDesc: docDesc,
      docOwner: username,
      docLink: docLink,
    });

    user.publications.push({
      docname: docname,
      docType: docType,
      docDesc: docDesc,
      docOwner: username,
      docLink: docLink,
    });

    // Save the updated user document
    const newPublication = await publication.save();
    const updatedUser = await user.save();
    console.log(newPublication);
    console.log(updatedUser);

    res.json({ success: true, message: "Publication added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
router.post("/addProjects", async (req, res) => {
  const {
    username,
    docname,
    docType,
    docDesc,
    docLink,
    projectType,
    fundingAgency,
    projectNumber,
    sDate,
    eDate,
  } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    const totalProjectCount = await Project.countDocuments()

    // Add the new resource to the user's resources array

    const project = new Project({
      docname: docname,
      docType: docType,
      docDesc: docDesc,
      docOwner: username,
      docLink: docLink,
      projectType,
      fundingAgency,
      projectNumber,
      sDate,
      eDate,
      serialNumber: totalProjectCount + 1,
    });

    user.projects.push(project);

    // Save the updated user document
    const newProject = await project.save();
    const updatedUser = await user.save();
    console.log(newProject);
    console.log(updatedUser);

    res.json({ success: true, message: "Project added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get("/getAllPublications", async (req, res) => {
  try {
    const publications = await Publication.find();
    res.status(201).json(publications);
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
});
router.get("/getAllProjects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(201).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
});

router.post("/addLeaveApp", async (req, res) => {
  const { username, fullName, appType, appDesc, days, sDate, eDate } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    // Add the new resource to the user's resources array

    const leaveApp = new LeaveApp({
      appType: appType,
      appDesc: appDesc,
      appOwner: username,
      appOwnerName: fullName,
      days: days,
      sDate: sDate,
      eDate: eDate,
      appStatus: "Pending",
    });

    user.leaveApplications.push({
      appType: appType,
      appDesc: appDesc,
      appOwner: username,
      days: days,
      sDate: sDate,
      eDate: eDate,
      appStatus: "Pending",
    });

    // Save the updated user document
    const newLeaveApp = await leaveApp.save();
    const updatedUser = await user.save();
    console.log(newLeaveApp);
    console.log(updatedUser);

    res.json({ success: true, message: "Application added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get("/getAllLeaveApps", async (req, res) => {
  try {
    const leaveApps = await LeaveApp.find();
    res.status(201).json(leaveApps);
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
});

router.post("/getLeaveAppsByUsername", async (req, res) => {
  const { username } = req.body;
  try {
    const leaveApps = await LeaveApp.find({ appOwner: username });

    console.log(leaveApps);
    res.status(201).json(leaveApps);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/updateApplicationStatus", async (req, res) => {
  const { username, appId, status } = req.body;

  console.log(username, status);

  try {
    const appDetails = await LeaveApp.findOneAndUpdate(
      { appOwner: username, _id: appId },
      { $set: { appStatus: status } },
      { new: true }
    );
    console.log(appDetails);
    res.status(200).json(appDetails);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
