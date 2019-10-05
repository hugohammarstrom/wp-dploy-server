"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

var _default = {
  log: function log() {
    for (var _len = arguments.length, _log = new Array(_len), _key = 0; _key < _len; _key++) {
      _log[_key] = arguments[_key];
    }

    console.log("".concat(_chalk["default"].blue("wp-dploy-server"), ": ").concat(_log));
  },
  error: function error() {
    for (var _len2 = arguments.length, log = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      log[_key2] = arguments[_key2];
    }

    console.log("".concat(_chalk["default"].red("wp-dploy-server"), ": ").concat(log));
  },
  warn: function warn() {
    for (var _len3 = arguments.length, log = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      log[_key3] = arguments[_key3];
    }

    console.log("".concat(_chalk["default"].yellow("wp-dploy-server"), ": ").concat(log));
  },
  success: function success() {
    for (var _len4 = arguments.length, log = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      log[_key4] = arguments[_key4];
    }

    console.log("".concat(_chalk["default"].green("wp-dploy-server"), ": ").concat(log));
  }
};
exports["default"] = _default;