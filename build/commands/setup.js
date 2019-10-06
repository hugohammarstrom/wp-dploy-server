"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _config = _interopRequireDefault(require("../modules/config"));

var _logger = _interopRequireDefault(require("../modules/logger"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _applicationSample = _interopRequireDefault(require("../static/application-sample"));

var _custom_upload_dir = _interopRequireDefault(require("../static/custom_upload_dir"));

var _hooksReadme = _interopRequireDefault(require("../static/hooks-readme"));

function _default(_x) {
  return _ref.apply(this, arguments);
}

function _ref() {
  _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(args) {
    var site_name, site, dir;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            site_name = args.site;

            if (site_name) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", _logger["default"].error("No site specified: use flag '--site'"));

          case 3:
            site = _config["default"].sites.find(function (site) {
              return site.name == site_name;
            });

            if (!site) {
              _logger["default"].error("Site not found");

              process.exit(-1);
            }

            dir = site.dir;

            _logger["default"].log("Ensuring that ".concat(dir, " exists"));

            _context.next = 9;
            return _fsExtra["default"].ensureDir("".concat(dir));

          case 9:
            _logger["default"].log("Ensuring that ".concat(dir, "/data exists"));

            _context.next = 12;
            return _fsExtra["default"].ensureDir("".concat(dir, "/data"));

          case 12:
            _logger["default"].log("Ensuring that ".concat(dir, "/data/uploads exists"));

            _context.next = 15;
            return _fsExtra["default"].ensureDir("".concat(dir, "/data/uploads"));

          case 15:
            _logger["default"].log("Ensuring that ".concat(dir, "/data/config exists"));

            _context.next = 18;
            return _fsExtra["default"].ensureDir("".concat(dir, "/data/config"));

          case 18:
            if (_fsExtra["default"].existsSync("".concat(dir, "/data/config/application.php"))) {
              _context.next = 22;
              break;
            }

            _logger["default"].log("Adding application.php to ".concat(dir, "/data/config"));

            _context.next = 22;
            return _fsExtra["default"].writeFile("".concat(dir, "/data/config/application.php"), _applicationSample["default"]);

          case 22:
            if (_fsExtra["default"].existsSync("".concat(dir, "/data/config/custom_upload_dir.php"))) {
              _context.next = 26;
              break;
            }

            _logger["default"].log("Adding custom_upload_dir.php to ".concat(dir, "/data/config"));

            _context.next = 26;
            return _fsExtra["default"].writeFile("".concat(dir, "/data/config/custom_upload_dir.php"), _custom_upload_dir["default"]);

          case 26:
            _logger["default"].log("Ensuring that ".concat(dir, "/hooks exists"));

            _context.next = 29;
            return _fsExtra["default"].ensureDir("".concat(dir, "/hooks"));

          case 29:
            if (_fsExtra["default"].existsSync("".concat(dir, "/hooks/readme.md"))) {
              _context.next = 33;
              break;
            }

            _logger["default"].log("Adding readme.md to ".concat(dir, "/hooks"));

            _context.next = 33;
            return _fsExtra["default"].writeFile("".concat(dir, "/hooks/readme.md"), _hooksReadme["default"]);

          case 33:
            _logger["default"].success("Setup successfully completed!");

          case 34:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _ref.apply(this, arguments);
}