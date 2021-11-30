import chalk from "chalk";
import fs from "fs/promises";
import { CONFIG_FILE_PATH } from "./config";
import type { ApiError } from "./type";

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

export const logMessage = (msg: string) => {
  log(chalk.bold(msg));
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

export const handleApiErrorMessage = (error: ApiError) => {
  const { message, documentation_url } = error.response.data;
  logError(message);
  logMessage("Reference address " + documentation_url);
};
