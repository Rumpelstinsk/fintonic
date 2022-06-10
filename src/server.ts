import 'module-alias/register';
import { container, initDI } from './inversify.dependencies';
import { Logger } from './shared';
import { MODULE_TYPES } from './constants';
import { initAPI, initDB } from './initializations';

// Dependencies
initDI();
const logger = container.get<Logger>(MODULE_TYPES.SHARED.Logger);

// DB
initDB(logger);

// API
initAPI(container);
