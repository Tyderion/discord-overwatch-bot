type LogMethod = keyof Pick<Console, 'log' | 'info' | 'error' | 'warn'>;

export interface Configuration {
    scope: Partial<Scope>;
    logLevel: LogLevel;
    defaultLevels: {
        [P in LogMethod]: LogLevel
    }
}

export interface Scope {
    open: string;
    close: string;
    delimiter: string;
    end: string;
};

export enum LogLevel {
    ERROR = 0,
    WARN = 1,
    INFO = 2,
    ALL = 4
}


export class Logger {
    private static get DEFAULT_CONFIG() {
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
        }
    }
    private static config: Configuration = Logger.DEFAULT_CONFIG;
    private static currentScope: string = '';
    public static configure(configuration: Partial<Configuration> = {}) {
        if (configuration.scope) {
            const scope = configuration.scope;
            Object.keys(scope).forEach(key => {
                this.config.scope[key] = scope[key];
            });
        }
        if (configuration.defaultLevels) {
            const defaultLevels = configuration.defaultLevels;
            Object.keys(defaultLevels).forEach(key => {
                this.config.scope[key] = defaultLevels[key];
            });
        }
    }

    public static set LogScope(scope: string) {
        Logger.currentScope = scope;
    }

    public static set LogLevel(level: LogLevel) {
        this.config.logLevel = level;
    }

    public static get LogLevel() {
        return this.config.logLevel;
    }

    public static create(prefix = ''): Logger {
        return new Logger([prefix]);
    }

    private constructor(
        private prefixes: string[] = ['']
    ) {
    }

    private get config(): Configuration {
        return Logger.config;
    }

    private get logLevel(): LogLevel {
        return Logger.config.logLevel;
    }

    private get prefix(): string {
        return `${Logger.config.scope.open}${this.prefixes.join(Logger.config.scope.delimiter)}${Logger.config.scope.close}${Logger.config.scope.end}`
    }

    private get currentScope(): string {
        return Logger.currentScope;
    }

    private _log(method: LogMethod, logLevel: LogLevel, ...args: any[]) {
        const prefix = this.prefix;
        if (this.logLevel >= logLevel && prefix.indexOf(this.currentScope) !== -1) {
            console[method](this.prefix, ...args);
        }
    }


    public log(...args: any[]): void {
        this._log('log', this.config.defaultLevels.log, ...args);
    }
    public info(...args: any[]): void {
        this._log('info', this.config.defaultLevels.info, ...args);
    }
    public error(...args: any[]): void {
        this._log('error', this.config.defaultLevels.error, ...args);
    }

    public warn(...args: any[]): void {
        this._log('warn', this.config.defaultLevels.warn, ...args);
    }

    public subLogger(prefix: string): Logger {
        return new Logger([...this.prefixes, prefix]);
    }
}