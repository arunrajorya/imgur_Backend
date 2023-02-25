module.exports = (app) => {
  const data = require("../controllers/post.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", data.create);

  // Retrieve all Tutorials
  router.get("/", data.findAll);

  // Retrieve all published Tutorials
  router.get("/published", data.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", data.findOne);

  // Update a Tutorial with id
  router.put("/:id", data.update);

  // Delete a Tutorial with id
  router.delete("/:id", data.delete);

  // Delete all Tutorials
  router.delete("/", data.deleteAll);

  app.use("/api/data", router);
};
