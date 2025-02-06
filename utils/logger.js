const logger = (log) => {
  const statusColor =
    log.status === STATUS.SUCCESS
      ? CONSOLE_COLORS.SUCCESS
      : STATUS.FAILED
      ? CONSOLE_COLORS.FAILED
      : CONSOLE_COLORS.HINT;
  const dataColor = CONSOLE_COLORS.DATA;
  if (log) {
    console.log(`[${statusColor}${log.status}\x1b[0m]: ${log.message}`);
    if (log.data) {
      console.log(`${dataColor}Data ⤵\x1b[0m`);
      console.table(log.data);
    }
  }
};

const STATUS = {
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
  HINT: "hINT",
};

const CONSOLE_COLORS = {
  FAILED: "\x1b[31m",
  SUCCESS: "\x1b[32m",
  DATA: "\x1b[33m",
};

module.exports = {
  logger,
  STATUS,
};
