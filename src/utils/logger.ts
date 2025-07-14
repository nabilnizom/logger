type LogLevel = "info" | "warn" | "error";

type LoggerOptions = {
  req?: Request;
  traceId?: string;
  extra?: Record<string, any>;
};

export default function logger(
  message: string,
  level: LogLevel = "info",
  opts: LoggerOptions = {}
) {
  const timestamp = new Date().toISOString();

  const { req, traceId, extra } = opts;

  const log = {
    timestamp,
    level,
    message,
    traceId,
    method: req?.method,
    url: req?.url,
    ...extra
  }

  const output = JSON.stringify(log);

  if (level === "error") {
    console.error(output);
  } else {
    console.log(output);
  }
}