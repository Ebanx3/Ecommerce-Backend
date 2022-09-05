import log4js from 'log4js';
import { NextFunction } from 'express';

log4js.configure({
    appenders: {
      multi: {
        type: "multiFile",
        base: "logs/",
        property: "categoryName",
        extension: ".log",
      },
    },
    categories: {
      default: { appenders: ["multi"], level: "info" },
    },
  });

// export const middlewareLogger = (req : Request, res : Response, next : NextFunction) => {
//     const logger = log4js.getLogger('info');
//     logger.info(`Info request: endpoint --> (${req.url}) , method --> (${req.method}) `)
//     next();
// }

// export const middlewareUndefinedPath = (req : Request, res : Response, next : NextFunction) => {
//     const logger = log4js.getLogger('warns');
//     logger.warn(`Undefined path, endpoint --> (${req.url}) , method --> (${req.method})`)
// }

export const errorLogger = (err : Error) => {
    const logger = log4js.getLogger('errors');
    logger.error(`Error: ${err.message}`);
}