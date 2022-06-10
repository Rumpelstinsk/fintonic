export interface Logger {
  debug: (message: string, metadata?: Record<string, unknown>) => void;
  info: (message: string, metadata?: Record<string, unknown>) => void;
  error: (error: unknown, metadata?: Record<string, unknown>) => void;
}
