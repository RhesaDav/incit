"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidPassword = isValidPassword;
function isValidPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}
//# sourceMappingURL=isValidPassword.js.map