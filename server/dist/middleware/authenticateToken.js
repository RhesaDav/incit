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
exports.authenticateToken = void 0;
const prismaClient_1 = __importDefault(require("../libs/prismaClient"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token;
    console.log('Received token:', token);
    if (!token)
        return res.sendStatus(401);
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);
        const session = yield prismaClient_1.default.session.findUnique({
            where: { token },
            include: { user: true }
        });
        console.log('Found session:', session);
        if (!session || new Date() > session.expiresAt) {
            return res.sendStatus(403);
        }
        req.user = session.user;
        next();
    }
    catch (error) {
        console.error('Authentication error:', error);
        return res.sendStatus(403);
    }
});
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=authenticateToken.js.map