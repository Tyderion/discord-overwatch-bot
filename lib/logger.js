"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
var Logger = (function () {
    function Logger(prefixes) {
        if (prefixes === void 0) { prefixes = ['']; }
        this.prefixes = prefixes;
    }
    Object.defineProperty(Logger, "DEFAULT_CONFIG", {
        get: function () {
            return {
                scope: {
                    open: '[',
                    close: ']',
                    delimiter: ':',
                    end: ':'
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Logger.configure = function (configuration) {
        var _this = this;
        if (configuration === void 0) { configuration = {}; }
        if (configuration.scope) {
            var scope_1 = configuration.scope;
            Object.keys(scope_1).forEach(function (key) {
                _this.config.scope[key] = scope_1[key];
            });
        }
    };
    Logger.create = function (prefix) {
        if (prefix === void 0) { prefix = ''; }
        return new Logger([prefix]);
    };
    Object.defineProperty(Logger.prototype, "prefix", {
        get: function () {
            return "" + Logger.config.scope.open + this.prefixes.join(Logger.config.scope.delimiter) + Logger.config.scope.close + Logger.config.scope.end;
        },
        enumerable: true,
        configurable: true
    });
    Logger.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = console.log).call.apply(_a, [console, this.prefix].concat(args));
        var _a;
    };
    Logger.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = console.info).call.apply(_a, [console, this.prefix].concat(args));
        var _a;
    };
    Logger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = console.error).call.apply(_a, [console, this.prefix].concat(args));
        var _a;
    };
    Logger.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = console.debug).call.apply(_a, [console, this.prefix].concat(args));
        var _a;
    };
    Logger.prototype.sub = function (prefix) {
        return new Logger(this.prefixes.concat([prefix]));
    };
    return Logger;
}());
Logger.config = Logger.DEFAULT_CONFIG;
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map