"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = void 0;

var _child_process = require("child_process");

var _logger = _interopRequireDefault(require("./logger"));

var _fsExtra = require("fs-extra");

var run = function run(_ref) {
  var dir = _ref.dir,
      name = _ref.name;
  return new Promise(function (resolve, reject) {
    var file = "".concat(dir, "/hooks/").concat(name);

    if ((0, _fsExtra.existsSync)(file)) {
      _logger["default"].log("Running hook \"".concat(name, "\""));

      (0, _child_process.exec)("sh ".concat(file), function (err, stdout, stderr) {
        if (err) {
          _logger["default"].error("Hook \"".concat(name, "\" failed!"));

          console.error(stderr);
          process.exit(-1);
          return;
        }

        if (stdout) console.log(stdout.trim());
        resolve();
      });
    } else resolve();
  });
};

exports.run = run;