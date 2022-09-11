import { Router } from "express";
import passport from "passport";
import { Request, Response } from "express";
import { CartModel } from "../cart/cart.model";

const router = Router();

router.post(
  "/login",
  passport.authenticate("login", {
    failureMessage: true,
    failureRedirect: "/api/users/loginError",
  }),
  (req: Request, res: Response) => {
    res.status(200).json({
      data: "ok",
    });
  }
);

router.post("/signup", async (req, res, next) => {
  passport.authenticate("signup", async (err: any, user: any, info: any) => {
    if (err) return next(err);
    if (!user) {
      if (info.message == "Email already used") {
        return res.status(400).json({
          data: info.message,
        });
      }
      return res.status(401).json(info);
    }
    await CartModel.create({ userId: user._id.toString() });
    // notifyNewUserByEmail(newUser);
    res.status(201).json({
      data: "signup successful",
    });
  })(req, res, next);
});

router.get("/loginError", (req, res) => {
  res.json({
    data: "Invalid email or password",
  });
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => {});
  res.status(200).json({
    data: "session destroyed",
  });
});

export default router;
