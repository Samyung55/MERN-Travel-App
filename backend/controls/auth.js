const authRouter = require("express").Router();
const User = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

authRouter.post("/register", async (req, res) => {
    try {
        const isExisting = await User.findOne({ email: req.body.email });
        if (isExisting) {
            return res.status(404).json({ msg: "Email already exists" });
        }

        if (req.body.username === "" || req.body.email === "" || req.body.password === "") {
            return res.status(500).json({ msg: "All fields are required" });
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = await bcrypt.hash(req.body.password, salt);

        const user = await User.create({ ...req.body, password: hash });
        await user.save();
        console.log('User created successfully')

        const { password, ...others } = user._doc
        console.log(others)
        const token = createToken(user);
        console.log(token)

        return res.status(201).json({ msg: "User created successful", others, token });
    }
    catch (error) {
        return res.status(500).json(error);
    }
})


authRouter.post("/login", async (req, res) => {
  try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
          return res.status(400).json("Wrong Credentials!");
      }

      const validated = await bcrypt.compare(req.body.password, user.password);
      if (!validated) {
          return res.status(400).json("Wrong credentials!");
      }

      const { password, ...others } = user._doc;
      return res.status(200).json(others);
  } catch (err) {
      return res.status(500).json({ error: err.message });
  }
});


const createToken = (user) => {
    const payload = {
        id: user._id.toString(),
        isAdmin: user.isAdmin,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return token;
};

module.exports = authRouter;