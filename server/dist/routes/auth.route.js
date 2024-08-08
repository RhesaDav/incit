"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const authenticateToken_1 = require("../middleware/authenticateToken");
const router = express_1.default.Router();
router.post("/register", auth_controller_1.register);
router.post("/login", auth_controller_1.login);
router.post("/logout", authenticateToken_1.authenticateToken, auth_controller_1.logout);
router.get("/check", authenticateToken_1.authenticateToken, auth_controller_1.checkAuth);
router.post("/forgot-password", auth_controller_1.forgotPassword);
router.post("/reset-password", auth_controller_1.resetPassword);
router.get("/verify-email", auth_controller_1.verifyEmail);
exports.default = router;
//# sourceMappingURL=auth.route.js.map