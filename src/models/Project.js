import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    projectname: String,
    technologies: String,
    websites: String,
    github: String,
  },
  { timestamps: true }
);

// Fix: use correct model name and mongoose.model (not mongoose.models("Project", ...))
const Project =
  mongoose.models.Project || mongoose.model("Project", ProjectSchema);

export default Project;
