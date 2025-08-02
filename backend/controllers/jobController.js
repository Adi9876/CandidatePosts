import Job from "../models/jobModel.js";

export const postJob = async (req, res) => {
  const job = new Job({ ...req.body, postedBy: req.user.id });
  await job.save();
  res.status(201).json(job);
};

export const getJobs = async (req, res) => {
  const { skill, location, tags } = req.query;
  const filter = {};

  if (skill) filter.skills = skill;
  if (location) filter.location = location;
  if (tags) filter.tags = { $in: tags.split(",") };

  const jobs = await Job.find(filter).populate("postedBy", "username name");
  res.json(jobs);
};
