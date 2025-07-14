import { v4 as uuidv4 } from "uuid";

type LogLevel = "info" | "warn" | "error";

type LoggerOptions = {
  req?: Request;
  traceId?: string;
  extra?: Record<string, any>;
};

function logger(
  message: string,
  level: LogLevel = "info",
  options?: LoggerOptions
) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    traceId: options?.traceId || "unknown",
    method: options?.req?.method || "unknown",
    url: options?.req?.url || "unknown",
    status: options?.extra?.status || 500,
    ...options?.extra,
  };

  console[level](JSON.stringify(logEntry));
}

export const RequestLogger = ({ request }: { request: Request }) => {
    const start = Date.now();
    const traceId = uuidv4();

    logger("Request received", "info", {
      req: request,
      traceId,
      extra: { startTime: start },
    });
    
    request.headers.set("X-Request-Start", start.toString());
    request.headers.set("X-Request-TraceId", traceId);
  }

export const ErrorLogger = ({ error, request, code }: { error: any; request: Request; code: number | string }) => {
    const traceId = request.headers.get("X-Request-TraceId") || "unknown";
    const duration = Date.now() - parseInt(request.headers.get("X-Request-Start") || "0", 10);

    logger(
      error?.message || "An error occurred while processing the request",
      "error", 
      {
        req: request,
        traceId,
        extra: {
          status: 500,
          duration
        },
      }
    );

    return new Response(error?.message || "Internal Server Error", {
      status: 500,
      statusText: String(code) || "Internal Server Error"
    });
  }

const Loggers = {
  Request: RequestLogger,
  Error: ErrorLogger,
}

export default Loggers;