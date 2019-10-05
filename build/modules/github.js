"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get_release_from_tag = exports.download_release = exports.request = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _config = _interopRequireDefault(require("./config"));

var _isRelativeUrl = _interopRequireDefault(require("is-relative-url"));

var _download = _interopRequireDefault(require("download"));

var _zipUnzipPromise = require("zip-unzip-promise");

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _logger = _interopRequireDefault(require("./logger"));

var hooks = _interopRequireWildcard(require("./hooks"));

/**
 * 
 * @param {RequestInfo} path 
 * @param {RequestInit} opts 
 * @returns {Promise<Response>}
 */
var request = function request(path) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var headers = opts.headers || {};
  opts.headers = headers;

  if (_config["default"].github && _config["default"].github.token) {
    opts.headers.Authorization = "token ".concat(_config["default"].github.token);
  }

  return new Promise(function (resolve, reject) {
    var url = (0, _isRelativeUrl["default"])(path) ? "https://api.github.com".concat(path) : path;
    var response;
    (0, _nodeFetch["default"])(url, opts).then(function (res) {
      response = res;
      return res.json();
    }).then(function (json) {
      if (response.status !== 200) {
        _logger["default"].error("Could not make request to github.com - exiting...");

        process.exit(-1);
      } else return resolve(json);
    })["catch"](function (err) {
      _logger["default"].error("Could not make request to github.com - exiting...");

      process.exit(-1);
    });
  });
};

exports.request = request;

var download_release =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(_ref) {
    var release, dir, tag, headers, folders;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            release = _ref.release, dir = _ref.dir;
            tag = release.tag_name;

            if (!release) {
              _context.next = 28;
              break;
            }

            if (!_fsExtra["default"].existsSync("".concat(dir, "/versions/").concat(tag))) {
              _context.next = 8;
              break;
            }

            _logger["default"].log("Release already downloaded - skipping...");

            return _context.abrupt("return");

          case 8:
            _logger["default"].log("Downloading release");

            _context.next = 11;
            return hooks.run({
              name: "pre-download",
              dir: dir
            });

          case 11:
            headers = {};

            if (_config["default"].github && _config["default"].github.token) {
              headers.Authorization = "token ".concat(_config["default"].github.token);
            }

            _context.next = 15;
            return (0, _download["default"])(release.zipball_url, dir + "/versions", {
              filename: "".concat(tag, ".zip"),
              headers: headers
            });

          case 15:
            _context.next = 17;
            return (0, _zipUnzipPromise.unzip)("".concat(dir, "/versions/").concat(tag, ".zip"), "".concat(dir, "/versions/").concat(tag, "-tmp"));

          case 17:
            _context.next = 19;
            return _fsExtra["default"].readdir("".concat(dir, "/versions/").concat(tag, "-tmp/"));

          case 19:
            folders = _context.sent;
            _context.next = 22;
            return _fsExtra["default"].move("".concat(dir, "/versions/").concat(tag, "-tmp/").concat(folders[0]), "".concat(dir, "/versions/").concat(tag));

          case 22:
            _context.next = 24;
            return _fsExtra["default"].remove("".concat(dir, "/versions/").concat(tag, ".zip"));

          case 24:
            _context.next = 26;
            return _fsExtra["default"].remove("".concat(dir, "/versions/").concat(tag, "-tmp"));

          case 26:
            _context.next = 28;
            return hooks.run({
              name: "post-download",
              dir: dir
            });

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function download_release(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.download_release = download_release;

var get_release_from_tag =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(_ref3) {
    var tag, repo, release;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            tag = _ref3.tag, repo = _ref3.repo;

            if (!(tag !== "latest")) {
              _context2.next = 7;
              break;
            }

            _context2.next = 4;
            return request("/repos/".concat(repo, "/releases/tags/").concat(tag));

          case 4:
            release = _context2.sent;
            _context2.next = 10;
            break;

          case 7:
            _context2.next = 9;
            return request("/repos/".concat(repo, "/releases/").concat(tag));

          case 9:
            release = _context2.sent;

          case 10:
            if (!release) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt("return", release);

          case 14:
            throw new Error("No release with that tag found");

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function get_release_from_tag(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

exports.get_release_from_tag = get_release_from_tag;