import fs from "fs/promises";
import axios from "axios";

import { logError, logInfo, logSuccess } from "./util";
import { CONFIG_FILE_PATH } from "./config";
import type { Config, Options } from "./type";

const writeConfigFile = (content: string) => {
  fs.writeFile(CONFIG_FILE_PATH, content)
    .then(() => {
      logInfo("token stored on " + CONFIG_FILE_PATH);
    })
    .catch((err) => {
      logError(err.message);
    });
};

const getTokenFromConfigFile = () => {
  return fs
    .readFile(CONFIG_FILE_PATH)
    .then((res) => {
      return res.toString();
    })
    .catch(() => {});
};

export const createRepository = (config: Config) => {
  const { token, ...data } = config;
  axios
    .post("https://api.github.com/user/repos", data, {
      headers: {
        accept: "application/vnd.github.v3+json",
        authorization: `token ${config.token}`,
      },
    })
    .then(() => {
      logSuccess("create a repository successfully");
    })
    .catch((err) => {
      logError(err.message);
    });
};

export const handleCreateAction = async (name: string, options: Options) => {
  const config = { name, ...options };
  if (options.token) {
    writeConfigFile(options.token);
    createRepository(config);
  } else {
    const token = await getTokenFromConfigFile();
    if (!token) {
      logError("need token to authenticate");
    } else {
      config.token = token;
      createRepository(config);
    }
  }
};
