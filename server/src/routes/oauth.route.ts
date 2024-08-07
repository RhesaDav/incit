import express from "express";
import passport from "passport";
import { googleCallback, facebookCallback } from "../controllers/oauth.controller";

const router = express.Router();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.BASE_URL_CLIENT}/login`,
    session: false,
  }),
  googleCallback
);

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: `${process.env.BASE_URL_CLIENT}/login`,
    session: false,
  }),
  facebookCallback
);

export default router;
