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


authRouter.post("/login", async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.body.username })
      if (!user) return next(createError(404, "User not found"))
  
      const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
      if (!isPasswordCorrect) return next(createError(404, "Wrong Password or username"))
  
      const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT)
  
      const { password, isAdmin, ...otherDetails } = user._doc
  
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ details: { ...otherDetails }, isAdmin })
    } catch (err) {
      next(err)
    }
  }
)
const createToken = (user) => {
    const payload = {
        id: user._id.toString(),
        isAdmin: user.isAdmin,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return token;
};

module.exports = authRouter;