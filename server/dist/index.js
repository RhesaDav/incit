"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("./libs/passport"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const oauth_route_1 = __importDefault(require("./routes/oauth.route"));
const profile_route_1 = __importDefault(require("./routes/profile.route"));
const statistic_route_1 = __importDefault(require("./routes/statistic.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(passport_1.default.initialize());
app.use((0, cors_1.default)({
    origin: `${process.env.BASE_URL_CLIENT}`,
    credentials: true,
    optionsSuccessStatus: 200,
}));
app.get("/", (req, res) => {
    return res.status(200).json(`test`);
});
app.use("/", oauth_route_1.default);
app.use("/auth", auth_route_1.default);
app.use("/statistic", statistic_route_1.default);
app.use("/user", user_route_1.default);
app.use("/profile", profile_route_1.default);
app.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map