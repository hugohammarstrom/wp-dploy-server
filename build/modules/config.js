"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _logger = _interopRequireDefault(require("./logger"));

var config = require('yaml-config');

if (!_fsExtra["default"].existsSync(process.env.config || '/etc/wp-dploy/config.yaml')) {
  _logger["default"].error("Config not found at path: ".concat(process.env.config || '/etc/wp-dploy/config.yaml'));

  process.exit(-1);
}

var settings = config.readConfig(process.env.config || '/etc/wp-dploy/config.yaml'); // path from your app root without slash

var _default = settings;
exports["default"] = _default;