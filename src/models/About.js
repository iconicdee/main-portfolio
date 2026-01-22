import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema(
  {
    yearofexperience: String,
    noofclient: String,
    noofproject: String,
    aboutme: String,
    skills: String,
  },
  { timestamps: true }
);

const About = mongoose.models.About || mongoose.model("About", AboutSchema);

export default About;
