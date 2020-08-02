"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sequence_1 = __importDefault(require("api/Sequence"));
class PostMessage {
    static get HANDLE_CLIENT_AND_WSAPI() {
        return "HANDLE_CLIENT_AND_WSAPI";
    }
    static get WSAPI_TO_CLIENT_TYPE() {
        return "WSAPI_TO_CLIENT_TYPE";
    }
    static get CLIENT_TO_WSAPI_TYPE() {
        return "CLIENT_TO_WSAPI_TYPE";
    }
    static get HANDLE_API_AND_CLIENT() {
        return "HANDLE_API_AND_CLIENT";
    }
    static get API_TO_CLIENT_TYPE() {
        return "API_TO_CLIENT_TYPE";
    }
    static get CLIENT_TO_API_TYPE() {
        return "CLIENT_TO_API_TYPE";
    }
    static get HANDLE_EXT_AND_API() {
        return "HANDLE_EXT_AND_API";
    }
    static get MEDIA_TO_CLIENT_TYPE() {
        return "MEDIA_TO_CLIENT_TYPE";
    }
    static get EXT_TO_API_TYPE() {
        return "EXT_TO_API_TYPE";
    }
    static get HANDLE_EXT_AND_CLIENT() {
        return "handleExtAndClient";
    }
    static get CLIENT_TO_EXT_TYPE() {
        return "CLIENT_TO_EXT_TYPE";
    }
    static get EXT_TO_CLIENT_TYPE() {
        return "EXT_TO_CLIENT_TYPE";
    }
    static convertApiToClientActionType(actionType) {
        if (actionType.indexOf(Sequence_1.default.API_TO_SERVER_REQUEST) === 0) {
            return actionType.replace(Sequence_1.default.API_TO_SERVER_REQUEST, Sequence_1.default.API_TO_CLIENT_REQUEST);
        }
        if (actionType.indexOf(Sequence_1.default.SERVER_TO_API_EMIT) === 0) {
            return actionType.replace(Sequence_1.default.SERVER_TO_API_EMIT, Sequence_1.default.API_TO_CLIENT_EMIT);
        }
        if (actionType.indexOf(Sequence_1.default.SERVER_TO_API_BROADCAST) === 0) {
            return actionType.replace(Sequence_1.default.SERVER_TO_API_BROADCAST, Sequence_1.default.API_TO_CLIENT_BROADCAST);
        }
        return `API_TO_CLIENT[ACTION]:${actionType}`;
    }
    static convertExtToClientActionType(actionType) {
        return `EXT_TO_CLIENT[ACTION]:${actionType}`;
    }
}
exports.default = PostMessage;
exports.HandleMessageMethod = "handle";
exports.HandleRequestMethod = "handle";
//# sourceMappingURL=PostMessage.js.map