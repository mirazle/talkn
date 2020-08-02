"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClientUtil {
    static deleteProtcol(str) {
        return str.replace("https:/", "").replace("http:/", "");
    }
}
exports.default = ClientUtil;
//# sourceMappingURL=clientUtil.js.map