/**
 * Experimental Logging Utility
 *
 * Provides structured logging for experimental runs.
 */

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export interface LogEntry {
  timestamp: number;
  level: LogLevel;
  message: string;
  metadata?: Record<string, any>;
}

export class ExperimentLogger {
  private logs: LogEntry[] = [];
  private minLevel: LogLevel;
  private enableConsole: boolean;

  constructor(
    minLevel: LogLevel = LogLevel.INFO,
    enableConsole: boolean = true
  ) {
    this.minLevel = minLevel;
    this.enableConsole = enableConsole;
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = Object.values(LogLevel);
    const currentIndex = levels.indexOf(level);
    const minIndex = levels.indexOf(this.minLevel);
    return currentIndex >= minIndex;
  }

  private log(
    level: LogLevel,
    message: string,
    metadata?: Record<string, any>
  ): void {
    if (!this.shouldLog(level)) return;

    const entry: LogEntry = {
      timestamp: Date.now(),
      level,
      message,
      metadata,
    };

    this.logs.push(entry);

    if (this.enableConsole) {
      const prefix = this.getPrefix(level);
      const metaStr = metadata ? ` ${JSON.stringify(metadata)}` : '';
      console.log(`${prefix} ${message}${metaStr}`);
    }
  }

  private getPrefix(level: LogLevel): string {
    const prefixes = {
      [LogLevel.DEBUG]: '🔍',
      [LogLevel.INFO]: 'ℹ️ ',
      [LogLevel.WARN]: '⚠️ ',
      [LogLevel.ERROR]: '❌',
    };
    return `[${new Date().toISOString()}] ${prefixes[level]}`;
  }

  debug(message: string, metadata?: Record<string, any>): void {
    this.log(LogLevel.DEBUG, message, metadata);
  }

  info(message: string, metadata?: Record<string, any>): void {
    this.log(LogLevel.INFO, message, metadata);
  }

  warn(message: string, metadata?: Record<string, any>): void {
    this.log(LogLevel.WARN, message, metadata);
  }

  error(message: string, metadata?: Record<string, any>): void {
    this.log(LogLevel.ERROR, message, metadata);
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  clear(): void {
    this.logs = [];
  }

  getErrorCount(): number {
    return this.logs.filter((log) => log.level === LogLevel.ERROR).length;
  }

  getWarningCount(): number {
    return this.logs.filter((log) => log.level === LogLevel.WARN).length;
  }
}
