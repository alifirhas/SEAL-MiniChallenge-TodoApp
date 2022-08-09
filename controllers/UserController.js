class UserController {
  async get(req, res) {
    res.status(200).send({
      message: "user route",
    });
  }
}

module.exports = new UserController();
