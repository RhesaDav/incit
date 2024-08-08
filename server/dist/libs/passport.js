"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_facebook_1 = require("passport-facebook");
const prismaClient_1 = __importDefault(require("../libs/prismaClient"));
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BASE_URL_SERVER}/auth/google/callback`,
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = profile.emails[0].value;
        let user = yield prismaClient_1.default.user.findUnique({ where: { email } });
        if (user) {
            user = yield prismaClient_1.default.user.update({
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
        }
        else {
            user = yield prismaClient_1.default.user.create({
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
    }
    catch (error) {
        done(error, false);
    }
})));
passport_1.default.use(new passport_facebook_1.Strategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.BASE_URL_SERVER}/auth/facebook/callback`,
    profileFields: ["id", "emails", "name"],
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const email = profile.emails[0].value;
        let user = yield prismaClient_1.default.user.findUnique({ where: { email } });
        if (user) {
            user = yield prismaClient_1.default.user.update({
                where: { email },
                data: {
                    username: user.username ? user.username : `${(_a = profile.name) === null || _a === void 0 ? void 0 : _a.givenName}`,
                    isVerified: true,
                    loginCount: { increment: 1 },
                    facebookId: profile.id,
                    authType: user.authType.includes("facebook")
                        ? user.authType
                        : user.authType + ",facebook",
                },
            });
        }
        else {
            user = yield prismaClient_1.default.user.create({
                data: {
                    email,
                    username: `${(_b = profile.name) === null || _b === void 0 ? void 0 : _b.givenName} ${(_c = profile.name) === null || _c === void 0 ? void 0 : _c.familyName}`,
                    isVerified: true,
                    loginCount: 1,
                    facebookId: profile.id,
                    authType: "facebook",
                },
            });
        }
        done(null, user);
    }
    catch (error) {
        done(error, false);
    }
})));
exports.default = passport_1.default;
//# sourceMappingURL=passport.js.map