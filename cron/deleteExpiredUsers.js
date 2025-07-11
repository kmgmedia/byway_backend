// I don’t have to delete cron/deleteExpiredUsers.js,
// but since you're deploying on Vercel, it’s not going
// to be useful unless you switch to a platform that
// supports background jobs (like Heroku, Render, VPS, etc).

const cron = require("node-cron");
const User = require("../models/user.models");

// Run every day at midnight
cron.schedule("0 0 * * *", async () => {
  try {
    const THIRTY_DAYS_AGO = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const expiredUsers = await User.find({
      isDeleted: true,
      deletedAt: { $lt: THIRTY_DAYS_AGO },
    });

    for (const user of expiredUsers) {
      await user.deleteOne();
      console.log(`Deleted expired user: ${user.email}`);
    }

    if (expiredUsers.length) {
      console.log(`✅ Deleted ${expiredUsers.length} expired user(s)`);
    }
  } catch (err) {
    console.error("Cron job failed:", err.message);
  }
});
