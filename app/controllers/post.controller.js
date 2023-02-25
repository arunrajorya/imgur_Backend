const db = require("../models");
const Imgur = db.posts;

// Create and Save a new Post
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Post
  const imgurPost = new Imgur({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  });

  // Save Post in the database
  imgurPost
    .save(imgurPost)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Post.",
      });
    });
};

// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Imgur.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Posts.",
      });
    });
};

// Find a single Post with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Imgur.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Post Not found with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Posts with id=" + id });
    });
};

// Update a Post by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Imgur.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Post with id=${id}. Maybe Post was not found!`,
        });
      } else res.send({ message: "Post was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Post with id=" + id,
      });
    });
};

// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Imgur.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Post with id=${id}. Maybe Post was not found!`,
        });
      } else {
        res.send({
          message: "Post was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Post with id=" + id,
      });
    });
};

// Delete all Post from the database.
exports.deleteAll = (req, res) => {
  Imgur.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Post were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Post.",
      });
    });
};

// Find all published Posts
exports.findAllPublished = (req, res) => {
  Imgur.find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Posts.",
      });
    });
};
