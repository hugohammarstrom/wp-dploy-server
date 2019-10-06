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

var github = _interopRequireWildcard(require("../modules/github"));

var _symlinkDir = _interopRequireDefault(require("symlink-dir"));

var hooks = _interopRequireWildcard(require("../modules/hooks"));

var state = _interopRequireWildcard(require("../modules/state"));

var _cleanup = _interopRequireDefault(require("./cleanup"));

function _default(_x) {
  return _ref.apply(this, arguments);
}

function _ref() {
  _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(args) {
    var _args$tag, tag, site_name, site, dir, repo, release, _ref2, _ref2$history, history, siteState;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _args$tag = args.tag, tag = _args$tag === void 0 ? "latest" : _args$tag, site_name = args.site;

            if (site_name) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", _logger["default"].error("No site specified: use flag '--site'"));

          case 3:
            if (!args.tag) {
              _logger["default"].warn("No tag specified, using latest...");
            }

            site = _config["default"].sites.find(function (site) {
              return site.name == site_name;
            });

            if (!site) {
              _logger["default"].error("Site not found");

              process.exit(-1);
            }

            dir = site.dir, repo = site.repo;

            _logger["default"].log("Fetching release info from github.com");

            _context.next = 10;
            return github.get_release_from_tag({
              repo: repo,
              tag: tag
            });

          case 10:
            release = _context.sent;
            _context.next = 13;
            return state.get({
              site: site.name
            });

          case 13:
            _ref2 = _context.sent;
            _ref2$history = _ref2.history;
            history = _ref2$history === void 0 ? [] : _ref2$history;

            if (!(history[history.length - 1] == release.tag_name)) {
              _context.next = 19;
              break;
            }

            _logger["default"].warn("This version is already deployed");

            return _context.abrupt("return");

          case 19:
            _context.next = 21;
            return github.download_release({
              release: release,
              dir: dir
            });

          case 21:
            _logger["default"].log("Deploying version: ".concat(release.tag_name));

            _context.next = 24;
            return hooks.run({
              name: "pre-deploy",
              dir: dir
            });

          case 24:
            _context.next = 26;
            return (0, _symlinkDir["default"])("".concat(dir, "/versions/").concat(release.tag_name), "".concat(dir, "/current"));

          case 26:
            _context.next = 28;
            return hooks.run({
              name: "post-deploy",
              dir: dir
            });

          case 28:
            _context.next = 30;
            return state.get({
              site: site.name
            });

          case 30:
            siteState = _context.sent;
            siteState.history = siteState.history || [];
            siteState.history.push(release.tag_name);
            _context.next = 35;
            return state.set({
              site: site.name,
              state: siteState
            });

          case 35:
            if (!args.cleanup) {
              _context.next = 38;
              break;
            }

            _context.next = 38;
            return (0, _cleanup["default"])(args);

          case 38:
            _logger["default"].success("Version successfully deployed!");

          case 39:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _ref.apply(this, arguments);
}