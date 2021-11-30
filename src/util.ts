import chalk from "chalk";
import fs from "fs/promises";

import { CONFIG_FILE_PATH } from "./config";

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

export const getTokenFromConfigFile = () => {
  return fs
    .readFile(CONFIG_FILE_PATH)
    .then((res) => {
      return res.toString();
    })
    .catch(() => {});
};
