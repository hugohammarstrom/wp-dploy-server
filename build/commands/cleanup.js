"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _config = _interopRequireDefault(require("../modules/config"));

var _logger = _interopRequireDefault(require("../modules/logger"));

var state = _interopRequireWildcard(require("../modules/state"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

function _default(_x) {
  return _ref.apply(this, arguments);
}

function _ref() {
  _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(args) {
    var site_name, site, _ref2, _ref2$history, history, current, versions, i;

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

            _context.next = 7;
            return state.get({
              site: site.name
            });

          case 7:
            _ref2 = _context.sent;
            _ref2$history = _ref2.history;
            history = _ref2$history === void 0 ? [] : _ref2$history;
            current = history[history.length - 1];
            _context.next = 13;
            return _fsExtra["default"].readdir("".concat(site.dir, "/versions"));

          case 13:
            versions = _context.sent;
            versions = versions.filter(function (version) {
              return version !== current;
            });

            if (!(versions.length > 0)) {
              _context.next = 27;
              break;
            }

            _logger["default"].log("Removing unused versions");

            i = 0;

          case 18:
            if (!(i < versions.length)) {
              _context.next = 24;
              break;
            }

            _context.next = 21;
            return _fsExtra["default"].remove("".concat(site.dir, "/versions/").concat(versions[i]));

          case 21:
            i++;
            _context.next = 18;
            break;

          case 24:
            _logger["default"].success("Successfully removed all unused versions");

            _context.next = 28;
            break;

          case 27:
            _logger["default"].warn("No versions to remove");

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _ref.apply(this, arguments);
}