import chalk from "chalk";

const log = console.log;

export const logError = (error: string) => {
  log(chalk.red("ERROR: " + error));
};

export const logInfo = (info: string) => {
  log(chalk.yellow("INFO: " + info));
};

export const logSuccess = (msg: string) => {
  log(chalk.green("SUCCESS: " + msg));
};

export const getHeader = (token: string) => ({
  accept: "application/vnd.github.v3+json",
  authorization: `token ${token}`,
});
