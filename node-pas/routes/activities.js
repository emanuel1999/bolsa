var express = require("express");
const res = require("express/lib/response");
const activitiesController = require("../controllers/activitiesController");
const {
  validateActivitiesFields,
  validateActivitiesCreate,
} = require("../middlewares/validateActivities");
var router = express.Router();
/* Routes Activities */

router.get("/", activitiesController.getActivities);

router.post("/", validateActivitiesCreate, activitiesController.postActivities);

router.put(
  "/:id",
  validateActivitiesFields,
  activitiesController.updateActivity
);

module.exports = router;
