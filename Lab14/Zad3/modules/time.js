"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.time = void 0;
var time = function (meet) {
    return meet.getHours() * 60 + meet.getMinutes();
};
exports.time = time;
