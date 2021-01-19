"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = void 0;
//Zdefiniuj typ wyliczeniowy Action
var Action;
(function (Action) {
    Action[Action["DAY_EARLIER"] = 0] = "DAY_EARLIER";
    Action[Action["DAY_LATER"] = 1] = "DAY_LATER";
    Action[Action["HOUR_EARLIER"] = 2] = "HOUR_EARLIER";
    Action[Action["HOUR_LATER"] = 3] = "HOUR_LATER";
})(Action = exports.Action || (exports.Action = {}));
