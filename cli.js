const dotenv = require("dotenv");

const { FileOperator } = require("./utils/fileOperator");
const { JsonOperator } = require("./utils/jsonOperator");
const { Log } = require("./models/log");
const { STATUS, logger } = require("./utils/logger");
const { getSuccessMessage, TYPES } = require("./utils/messageHandler");
const { add } = require("./commands/add");

const { remove } = require("./commands/removeRepo");
const { init } = require("./commands/init");
dotenv.config({ path: ".env" });

// init();
