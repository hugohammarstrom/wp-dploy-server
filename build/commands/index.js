"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleanup = exports.setup = exports.deploy = void 0;

var _deploy2 = _interopRequireDefault(require("./deploy"));

var _setup2 = _interopRequireDefault(require("./setup"));

var _cleanup2 = _interopRequireDefault(require("./cleanup"));

var deploy = _deploy2["default"];
exports.deploy = deploy;
var setup = _setup2["default"];
exports.setup = setup;
var cleanup = _cleanup2["default"];
exports.cleanup = cleanup;