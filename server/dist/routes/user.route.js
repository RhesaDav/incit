"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const authenticateToken_1 = require("../middleware/authenticateToken");
const router = express_1.default.Router();
router.get('/', authenticateToken_1.authenticateToken, user_controller_1.getUsers);
exports.default = router;
//# sourceMappingURL=user.route.js.map