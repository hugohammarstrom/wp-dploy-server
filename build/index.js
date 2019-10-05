"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _commander = _interopRequireDefault(require("commander"));

var commands = _interopRequireWildcard(require("./commands"));

var state = _interopRequireWildcard(require("./modules/state"));

var _logger = _interopRequireDefault(require("./modules/logger"));

_commander["default"].command('cleanup').description("Cleanup unused versions").option('-s, --site <string>', 'site argument').action(commands.cleanup);

_commander["default"].command('deploy').description("Download version from github and deploy").option('-s, --site <string>', 'site argument').option('-t, --tag <string>', 'tag argument').option('-c, --cleanup', 'cleanup after deploy').action(commands.deploy);

_commander["default"].command('rollback').description("Rollback to latest active version").option('-s, --site <string>', 'site argument').option('-c, --cleanup', 'cleanup after deploy').action(
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(args) {
    var _ref2, _ref2$history, history;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (args.site) {
              _context.next = 3;
              break;
            }

            if (args.site) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", _logger["default"].error("No site specified: use flag '--site'"));

          case 3:
            _context.next = 5;
            return state.get({
              site: args.site
            });

          case 5:
            _ref2 = _context.sent;
            _ref2$history = _ref2.history;
            history = _ref2$history === void 0 ? [] : _ref2$history;

            if (!(history.length >= 2)) {
              _context.next = 14;
              break;
            }

            args.tag = history[history.length - 2];
            _context.next = 12;
            return commands.deploy(args);

          case 12:
            _context.next = 15;
            break;

          case 14:
            return _context.abrupt("return", _logger["default"].warn("Nothing to rollback to - skipping..."));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

_commander["default"].command('setup').description("Setup site at the desired directory").option('-s, --site <string>', 'site argument').action(commands.setup);

_commander["default"].parse(process.argv); // Check the program.args obj


var NO_COMMAND_SPECIFIED = _commander["default"].args.length === 0; // Handle it however you like

if (NO_COMMAND_SPECIFIED) {
  // e.g. display usage
  _commander["default"].help();
}