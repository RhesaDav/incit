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
exports.editProfile = exports.profileDetail = void 0;
const prismaClient_1 = __importDefault(require("../libs/prismaClient"));
const profileDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prismaClient_1.default.user.findUnique({
            where: { id: req.user.id },
        });
        if (!user)
            return res.status(404).json({ error: "User not found" });
        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
});
exports.profileDetail = profileDetail;
const editProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        yield prismaClient_1.default.user.update({
            where: { id: req.user.id },
            data: { username },
        });
        res.status(200).json({ message: "Profile updated successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
});
exports.editProfile = editProfile;
//# sourceMappingURL=profile.controller.js.map