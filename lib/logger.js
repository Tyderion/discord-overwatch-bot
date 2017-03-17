"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["ERROR"] = 0] = "ERROR";
    LogLevel[LogLevel["WARN"] = 1] = "WARN";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["ALL"] = 4] = "ALL";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
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
                },
                logLevel: LogLevel.ALL,
                defaultLevels: {
                    log: LogLevel.ALL,
                    info: LogLevel.INFO,
                    warn: LogLevel.WARN,
                    error: LogLevel.ERROR
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
        if (configuration.defaultLevels) {
            var defaultLevels_1 = configuration.defaultLevels;
            Object.keys(defaultLevels_1).forEach(function (key) {
                _this.config.scope[key] = defaultLevels_1[key];
            });
        }
    };
    Object.defineProperty(Logger, "LogScope", {
        set: function (scope) {
            Logger.currentScope = scope;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Logger, "LogLevel", {
        get: function () {
            return this.config.logLevel;
        },
        set: function (level) {
            this.config.logLevel = level;
        },
        enumerable: true,
        configurable: true
    });
    Logger.create = function (prefix) {
        if (prefix === void 0) { prefix = ''; }
        return new Logger([prefix]);
    };
    Object.defineProperty(Logger.prototype, "config", {
        get: function () {
            return Logger.config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Logger.prototype, "logLevel", {
        get: function () {
            return Logger.config.logLevel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Logger.prototype, "prefix", {
        get: function () {
            return "" + Logger.config.scope.open + this.prefixes.join(Logger.config.scope.delimiter) + Logger.config.scope.close + Logger.config.scope.end;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Logger.prototype, "currentScope", {
        get: function () {
            return Logger.currentScope;
        },
        enumerable: true,
        configurable: true
    });
    Logger.prototype._log = function (method, logLevel) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var prefix = this.prefix;
        if (this.logLevel >= logLevel && prefix.indexOf(this.currentScope) !== -1) {
            console[method].apply(console, [this.prefix].concat(args));
        }
    };
    Logger.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._log.apply(this, ['log', this.config.defaultLevels.log].concat(args));
    };
    Logger.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._log.apply(this, ['info', this.config.defaultLevels.info].concat(args));
    };
    Logger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._log.apply(this, ['error', this.config.defaultLevels.error].concat(args));
    };
    Logger.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._log.apply(this, ['warn', this.config.defaultLevels.warn].concat(args));
    };
    Logger.prototype.subLogger = function (prefix) {
        return new Logger(this.prefixes.concat([prefix]));
    };
    return Logger;
}());
Logger.config = Logger.DEFAULT_CONFIG;
Logger.currentScope = '';
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map