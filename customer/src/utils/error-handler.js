import { createLogger, transports } from "winston";
import { AppError } from "./app-errors";

const LogErrors = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({ filename: "app_error.log" }),
  ],
});

class ErrorLogger {
  constructor() {}

  async logError(error) {
    console.log(
      "======================== Start Error Logger ========================",
    );

    LogErrors.log({
      private: true,
      level: "error",
      message: `${new Date().toISOString()} - ${JSON.stringify(error)}`,
    });

    console.log(
      "======================== End Error Logger ========================",
    );

    return false;
  }

  isTrustedError(error) {
    // Implement logic to determine if the error is trusted or not

    if (error instanceof AppError) {
      return error.isOperational;
    }
    return false;
  }
}

export const ErrorHandler = (err, req, res, next) => {
  const errorLogger = new ErrorLogger();

  process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    errorLogger.logError(error);
    process.exit(1); // Exit the process after logging the error
  });

  // console.log(err.description);
  // console.log(err.message);
    // console.log(err.name);
    
    if (err) {
        await errorLogger.logError(err);
        if (errorLogger.isTrustedError(err)) { 
            if (err.errorStack) { 
                const errorDescription = err.description;
                return res.status(err.statusCode).json({ message: errorDescription });
            }
            return res.status(err.statusCode).json({ message: err.message });
        }else {
            return res.status(500).json({ message: "Internal Server Error" });
        } 

        return res.status(err.statusCode || 500).json({ message: err.message});
    }
    next();
};
