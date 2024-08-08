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
exports.facebookCallback = exports.googleCallback = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prismaClient_1 = __importDefault(require("../libs/prismaClient"));
const googleCallback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = jsonwebtoken_1.default.sign({ userId: req.user.id }, process.env.JWT_SECRET);
        yield prismaClient_1.default.session.create({
            data: {
                userId: req.user.id,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
                token
            },
        });
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.redirect(`${process.env.BASE_URL_CLIENT}/oauth-callback`);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.googleCallback = googleCallback;
const facebookCallback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = jsonwebtoken_1.default.sign({ userId: req.user.id }, process.env.JWT_SECRET);
        yield prismaClient_1.default.session.create({
            data: {
                userId: req.user.id,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
                token
            },
        });
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.redirect(`${process.env.BASE_URL_CLIENT}/oauth-callback`);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.facebookCallback = facebookCallback;
//# sourceMappingURL=oauth.controller.js.map