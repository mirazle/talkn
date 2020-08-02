"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conf_1 = __importDefault(require("common/conf"));
const fs_1 = __importDefault(require("fs"));
class Fs {
    writeFavicon(fileName, binary) {
        const writeFileName = `${conf_1.default.serverAssetsPath}icon/${fileName}`;
        if (binary) {
            if (!this.isExist(writeFileName)) {
                fs_1.default.writeFileSync(writeFileName, binary, "binary");
                return true;
            }
            else {
                return false;
            }
        }
        else {
            console.log("NO BINARY FAVICON " + fileName);
            return false;
        }
    }
    isExistFavicon(fileName) {
        try {
            const writeFileName = `${conf_1.default.serverAssetsPath}icon/${fileName}`;
            fs_1.default.statSync(writeFileName);
            return true;
        }
        catch (err) {
            return false;
        }
    }
    isExist(writeFileName) {
        try {
            fs_1.default.statSync(writeFileName);
            return true;
        }
        catch (err) {
            return false;
        }
    }
}
exports.default = Fs;
//# sourceMappingURL=Fs.js.map