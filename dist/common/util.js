"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    isUrl: (str) => {
        const pattern = new RegExp('^(https?:\\/\\/)?' +
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
            '((\\d{1,3}\\.){3}\\d{1,3}))' +
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
            '(\\?[;&a-z\\d%_.~+=-]*)?' +
            '(\\#[-a-z\\d_]*|\\/)?$', 'i');
        return !pattern.test(str) ? false : true;
    },
    getSaveFaviconName: (fileName) => {
        if (fileName) {
            const _fileName = fileName.replace(/\u002f/g, "_");
            return _fileName.indexOf('.png') > 0 ? _fileName : _fileName + ".png";
        }
    },
    trimPx: (value) => {
        return value.toString().replace('px', '');
    }
};
//# sourceMappingURL=util.js.map