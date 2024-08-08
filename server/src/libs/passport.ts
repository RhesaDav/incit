import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import prisma from "../libs/prismaClient";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${process.env.BASE_URL_SERVER}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails![0].value;
        let user = await prisma.user.findUnique({ where: { email } });

        if (user) {
          user = await prisma.user.update({
            where: { email },
            data: {
              username: user.username ? user.username : profile.displayName,
              isVerified: true,
              loginCount: { increment: 1 },
              googleId: profile.id,
              authType: user.authType.includes("google")
                ? user.authType
                : user.authType + ",google",
            },
          });
        } else {
          user = await prisma.user.create({
            data: {
              email,
              username: profile.displayName,
              isVerified: true,
              loginCount: 1,
              googleId: profile.id,
              authType: "google",
            },
          });
        }
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID!,
      clientSecret: process.env.FACEBOOK_APP_SECRET!,
      callbackURL: `${process.env.BASE_URL_SERVER}/auth/facebook/callback`,
      profileFields: ["id", "emails", "name"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails![0].value;
        let user = await prisma.user.findUnique({ where: { email } });

        if (user) {
          user = await prisma.user.update({
            where: { email },
            data: {
              username: user.username ? user.username : `${profile.name?.givenName}`,
              isVerified: true,
              loginCount: { increment: 1 },
              facebookId: profile.id,
              authType: user.authType.includes("facebook")
                ? user.authType
                : user.authType + ",facebook",
            },
          });
        } else {
          user = await prisma.user.create({
            data: {
              email,
              username: `${profile.name?.givenName} ${profile.name?.familyName}`,
              isVerified: true,
              loginCount: 1,
              facebookId: profile.id,
              authType: "facebook",
            },
          });
        }
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

export default passport;
