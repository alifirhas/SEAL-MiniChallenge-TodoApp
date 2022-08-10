const jsonwebtoken = require("jsonwebtoken");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const db = require("../models/index");
const User = db.users;

exports.register = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    let password = req.body.password;


    if (!name || !password || !email) {
      return res.sendStatus(400);
    }

    checkemail = await User.findOne({
      where: {
        email: email,
      },
    });

    if (checkemail) {
      return res.status(409).json({
        status: 409,
        message: "email has been taken",
      });
    }

    const salt = genSaltSync(10);
    password = hashSync(password, salt);

    const create = await User.create({
      name: name,
      email: email,
      password: password,
    });

    res.status(201).json({
      status: 201,
      message: "User Created"
    });

  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email } = req.body
    const password = req.body.password;

    if (!password || !email) {
      return res.sendStatus(400);
    }

    checkemail = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!checkemail) {
      return res.status(409).json({
        status: 409,
        message: "Invalid email or password",
      });
    }

    const isValidPassword = compareSync(password, checkemail.dataValues.password);

    if (isValidPassword) {
      let user = {
        id: checkemail.dataValues.id,
        name: checkemail.dataValues.name,
        email: checkemail.dataValues.email
      };
      const jsontoken = jsonwebtoken.sign({
        user: user,
      },
        process.env.SECRET_KEY, {
        expiresIn: "6h",
      }
      );

      res.status(200).json({
        status: 200,
        token: jsontoken
      });

    } else {
      return res.status(401).json({
        status: 401,
        message: "Invalid email or password"
      });
    }
  } catch (e) {
    console.log(e);
  }
};