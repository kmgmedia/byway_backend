const express = require("express");
const router = express.Router();
const User = require("../models/user.models");

router.get("/delete-expired-users", async (req, res) => {
  try {
    const THIRTY_DAYS_AGO = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const expiredUsers = await User.find({
      isDeleted: true,
      deletedAt: { $lt: THIRTY_DAYS_AGO },
    });

    for (const user of expiredUsers) {
      await user.deleteOne();
      console.log(`Deleted user: ${user.email}`);
    }

    res
      .status(200)
      .json({ message: `Deleted ${expiredUsers.length} expired users` });
  } catch (error) {
    console.error("Cron route failed:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
