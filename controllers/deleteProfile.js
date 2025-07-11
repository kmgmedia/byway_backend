exports.deleteProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user.isDeleted) {
    res.status(400);
    throw new Error("User already marked for deletion");
  }

  user.isDeleted = true;
  user.deletedAt = new Date();
  await user.save();

  res
    .status(200)
    .json({
      message: "User marked for deletion. Account will be removed in 30 days.",
    });
});
