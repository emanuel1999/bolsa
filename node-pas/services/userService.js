const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const usersRepositories = require("../repositories/usersRepository");

const userService = {
  postLogin: async function (req, res) {
    const {email, password} = req.body;

    const user = await usersRepositories.findOne({
      where: {
        email,
      },
    });
    try {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({user}, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        return res.status(200).json({
          auth: true,
          user: user,
          token,
        });
      } else {
        return res.status(400).json({ok: false});
      }
    } catch (error) {
      res.status(400).json({msg: "Login error"});
      console.log(err);
    }
  },
};

module.exports = userService;
