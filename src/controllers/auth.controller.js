const User = require("../models/user.model");

const { hashPassword } = require("../utils/authHelper.util");

module.exports = {
  regUser: async (req, res, next) => {
    const { email, first_name } = req.body;
    const user = await User.query().findOne("email", "=", email);
    if (user) {
      res.status(400);
      res.send({ msg: "User already exists!" });
    } else {
      const password = hashPassword(req.body.password);

      const newUser = await User.query()
        .insertGraphAndFetch(
          {
            first_name: first_name,
            email: email,
            password: password,

            avatar : {
            },
            shipping_address : {
            }

          }
        )
        .select("id", "first_name", "email", "password");

      req.login(newUser, (err) => {
        if (err) {
          return next(err);
        }
        res.status(201);
        console.log(newUser)
        res.send({ msg: "Created"});
      });
    }
  },
};
