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
exports.getStatistic = void 0;
const prismaClient_1 = __importDefault(require("../libs/prismaClient"));
const getStatistic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalUsers = yield prismaClient_1.default.user.count();
        const activeSessionsToday = yield prismaClient_1.default.session.count({
            where: {
                createdAt: {
                    gte: new Date(new Date().setHours(0, 0, 0, 0)),
                },
            },
        });
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d;
        });
        const activeSessions7Days = yield Promise.all(last7Days.map((date) => __awaiter(void 0, void 0, void 0, function* () {
            return prismaClient_1.default.session.count({
                where: {
                    createdAt: {
                        gte: new Date(date.setHours(0, 0, 0, 0)),
                        lt: new Date(date.setHours(23, 59, 59, 999)),
                    },
                },
            });
        })));
        const averageActiveSessions7Days = activeSessions7Days.reduce((a, b) => a + b, 0) / 7;
        res.json({
            totalUsers,
            activeSessionsToday,
            averageActiveSessions7Days,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
});
exports.getStatistic = getStatistic;
//# sourceMappingURL=statistic.controller.js.map