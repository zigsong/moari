const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  img: {
    data: Buffer,
    contentType: String,
  },
  club: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
    },
  ],
});

const tagSchema = mongoose.Schema({
  tagName: {
    type: String,
    required: true,
  },
  matchClubs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
    },
  ],
});

const clubSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  photos: [
    {
      type: imageSchema,
      ref: "Image",
    },
  ],
  category: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
  status: {
    type: String,
    required: true,
  },
  likedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  views: {
    type: Number,
    default: 0,
  },
  recruits: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recruit",
    },
  ],
});

const Image = mongoose.model("Image", imageSchema);
const Tag = mongoose.model("Tag", tagSchema);
const Club = mongoose.model("Club", clubSchema);
module.exports = {
  Image,
  Tag,
  Club,
};
