"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const oauth_controller_1 = require("../controllers/oauth.controller");
const router = express_1.default.Router();
router.get("/auth/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
router.get("/auth/google/callback", passport_1.default.authenticate("google", {
    failureRedirect: `${process.env.BASE_URL_CLIENT}/login`,
    session: false,
}), oauth_controller_1.googleCallback);
router.get("/auth/facebook", passport_1.default.authenticate("facebook", { scope: ["email"] }));
router.get("/auth/facebook/callback", passport_1.default.authenticate("facebook", {
    failureRedirect: `${process.env.BASE_URL_CLIENT}/login`,
    session: false,
}), oauth_controller_1.facebookCallback);
exports.default = router;
//# sourceMappingURL=oauth.route.js.map