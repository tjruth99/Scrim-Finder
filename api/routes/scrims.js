const express = require("express");
const router = express.Router();

const Scrim = require("../models/scrims.models");

// Get data on every scrim in database
router.get("/", async (req, res) => {
  try {
    let params = req.query;
    let start = "00:00";
    let end = "24:00";

    if ("startTime" in params || "endTime" in params) {
      start = params.startTime;
      end = params.endTime;

      delete params.startTime;
      delete params.endTime;
    }

    const scrims = await Scrim.find(params);

    let filteredScrims = scrims.filter(
      (data) => start <= data.startTime && end >= data.endTime
    );

    res.json(filteredScrims);
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
    discord: req.body.discord,
  });

  try {
    const scrim = await newScrimData.save();
    res.status(201).json(scrim);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a scrim request by the id
router.delete("/:id", getScrimByID, async (req, res) => {
  try {
    await res.scrim.remove();
    res.json({ message: "Deleted Scrim Data" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update scrim information
router.patch("/:id", getScrimByID, async (req, res) => {
  if (req.body.date != null) {
    res.scrim.date = req.body.date;
  }
  if (req.body.startTime != null) {
    res.scrim.startTime = req.body.startTime;
  }
  if (req.body.endTime != null) {
    res.scrim.endTime = req.body.endTime;
  }
  if (req.body.elo != null) {
    res.scrim.elo = req.body.elo;
  }
  if (req.body.region != null) {
    res.scrim.region = req.body.region;
  }
  if (req.body.discord != null) {
    res.scrim.discord = req.body.discord;
  }

  try {
    const updatedScrim = await res.scrim.save();
    res.json(updatedScrim);
  } catch (err) {
    res.status(400).json({ message: err.message });
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

async function verifyTime(params) {
  console.log("params", params);

  if ("startTime" in params && "endTime" in params) {
    let start = params.startTime;
    let end = params.endTime;

    delete params.startTime;
    delete params.endTime;
  }

  console.log("params", params);

  const scrims = await Scrim.find(params);

  return scrims;
}

module.exports = router;
