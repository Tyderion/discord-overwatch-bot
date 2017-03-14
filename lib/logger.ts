export interface Configuration {
    scope: Partial<Scope>
}

export interface Scope {
    open: string;
    close: string;
    delimiter: string;
    end: string;
};


export class Logger {
    private static get DEFAULT_CONFIG() {
        return {
            scope: {
                open: '[',
                close: ']',
                delimiter: ':',
                end: ':'
            }
        }
    }
    private static config: Configuration = Logger.DEFAULT_CONFIG;
    public static configure(configuration: Partial<Configuration> = {}) {
        if (configuration.scope) {
            const scope = configuration.scope;
            Object.keys(scope).forEach(key => {
                this.config.scope[key] = scope[key];
            });
        }
    }

    public static create(prefix = ''): Logger {
        return new Logger([prefix]);
    }

    private constructor(
        private prefixes: string[] = ['']
    ) {
    }

    private get prefix(): string {
        return `${Logger.config.scope.open}${this.prefixes.join(Logger.config.scope.delimiter)}${Logger.config.scope.close}${Logger.config.scope.end}`
    }

    public log(...args: any[]): void {
        console.log.call(console, this.prefix, ...args);
    }
    public info(...args: any[]): void {
        console.info.call(console, this.prefix, ...args);
    }
    public error(...args: any[]): void {
        console.error.call(console, this.prefix, ...args);
    }

    public debug(...args: any[]): void {
        console.debug.call(console, this.prefix, ...args);
    }

    public sub(prefix: string): Logger {
        return new Logger([...this.prefixes, prefix]);
    }
}