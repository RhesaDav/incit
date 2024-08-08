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
exports.resendVerificationEmail = exports.verifyEmail = exports.resetPassword = exports.forgotPassword = exports.checkAuth = exports.logout = exports.login = exports.register = void 0;
const prismaClient_1 = __importDefault(require("../libs/prismaClient"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmailVerification_1 = require("../utils/sendEmailVerification");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const isAlreadyExist = yield prismaClient_1.default.user.findUnique({
            where: {
                email,
            },
        });
        if (isAlreadyExist) {
            const token = jsonwebtoken_1.default.sign({ userId: isAlreadyExist.id }, process.env.JWT_SECRET);
            yield (0, sendEmailVerification_1.sendVerificationEmail)(email, token);
            return res.status(400).json({
                message: "Email already exist. Please verify your email",
            });
        }
        const hashedPass = yield bcrypt_1.default.hash(password, 10);
        const data = yield prismaClient_1.default.user.create({
            data: {
                email,
                username,
                password: hashedPass,
                authType: "email",
            },
        });
        const token = jsonwebtoken_1.default.sign({ userId: data.id }, process.env.JWT_SECRET);
        yield (0, sendEmailVerification_1.sendVerificationEmail)(email, token);
        return res.status(201).json({
            message: "Register success, please check your email",
            data,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield prismaClient_1.default.user.findUnique({ where: { email } });
        if (!user || !user.password) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET);
        yield prismaClient_1.default.user.update({
            where: { id: user.id },
            data: {
                loginCount: { increment: 1 },
                lastLoginAt: new Date(),
            },
        });
        yield prismaClient_1.default.session.create({
            data: {
                userId: user.id,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
                token,
            },
        });
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({ isVerified: user.isVerified, token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("token");
        yield prismaClient_1.default.user.update({
            where: { id: req.user.id },
            data: { lastLogoutAt: new Date() },
        });
        yield prismaClient_1.default.session.deleteMany({
            where: { userId: req.user.id },
        });
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
});
exports.logout = logout;
const checkAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prismaClient_1.default.user.findUnique({
            where: { id: req.user.id },
        });
        if (!user || !user.isVerified) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        res.status(200).json({ message: 'Authenticated' });
    }
    catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
});
exports.checkAuth = checkAuth;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield prismaClient_1.default.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const transporter = nodemailer_1.default.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            },
        });
        const mailOptions = {
            to: email,
            from: process.env.SMTP_USERNAME,
            subject: "Password Reset",
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n
      ${process.env.BASE_URL_CLIENT}/reset-password/${user.id}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };
        yield transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Password reset email sent" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, password } = req.body;
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        yield prismaClient_1.default.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });
        res.status(200).json({ message: "Password reset successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.resetPassword = resetPassword;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.query;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        yield prismaClient_1.default.user.update({
            where: { id: decoded.userId },
            data: { isVerified: true },
        });
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.redirect(`${process.env.BASE_URL_CLIENT}/dashboard`);
    }
    catch (error) {
        res.status(400).json({ message: "Invalid or expired token" });
    }
});
exports.verifyEmail = verifyEmail;
const resendVerificationEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield prismaClient_1.default.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.isVerified) {
            return res.status(400).json({ message: "Email is already verified" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        yield (0, sendEmailVerification_1.sendVerificationEmail)(email, token);
        res.status(200).json({ message: "Verification email sent" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.resendVerificationEmail = resendVerificationEmail;
//# sourceMappingURL=auth.controller.js.map