"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTokenCookie = setTokenCookie;
function setTokenCookie(res, token) {
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
}
//# sourceMappingURL=setTokenCookie.js.map