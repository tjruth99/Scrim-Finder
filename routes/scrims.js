const express = require("express");
const router = express.Router();

const Scrim = require("../models/scrims.models");

// Get data on every scrim in database
router.get("/", async (req, res) => {
  try {
    const scrims = await Scrim.find();
    res.json(scrims);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get scrim data from an ID
router.get("/:id", getScrimByID, (req, res) => {
  res.json(res.scrim);
});

// Post a new scrim to the database
router.post("/", async (req, res) => {
  const newScrimData = new Scrim({
    teamName: req.body.teamName,
    game: req.body.game,
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    elo: req.body.elo,
    region: req.body.region,
  });

  try {
    const scrim = await newScrimData.save();
    res.status(201).json(scrim);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", getScrimByID, async (req, res) => {
  try {
    await res.scrim.remove();
    res.json({ message: "Deleted Scrim Data" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Intermediate function to return scrim from a given ID
async function getScrimByID(req, res, next) {
  let scrim;
  try {
    scrim = await Scrim.findById(req.params.id);
    if (scrim == null) {
      return res
        .status(404)
        .json({ message: "Cannot find scrim with given ID" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.scrim = scrim;
  next();
}

module.exports = router;
