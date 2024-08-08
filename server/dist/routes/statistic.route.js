"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const statistic_controller_1 = require("../controllers/statistic.controller");
const authenticateToken_1 = require("../middleware/authenticateToken");
const router = express_1.default.Router();
router.get('/', authenticateToken_1.authenticateToken, statistic_controller_1.getStatistic);
exports.default = router;
//# sourceMappingURL=statistic.route.js.map