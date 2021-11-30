import fs from "fs/promises";
import axios from "axios";
import simpleGit, { SimpleGit } from "simple-git/promise";

import {
  logError,
  logInfo,
  logSuccess,
  getHeader,
  getTokenFromConfigFile,
} from "./util";
import { CONFIG_FILE_PATH, USER_NAME_FILED } from "./config";
import type {
  CreateConfig,
  DetailOptions,
  BaseOptions,
  DeleteConfig,
  HandleActionCallback,
} from "./type";

const git: SimpleGit = simpleGit();

export const handleTokenAction = (token: string) => {
  fs.writeFile(CONFIG_FILE_PATH, token)
    .then(() => {
      logInfo("token stored on " + CONFIG_FILE_PATH);
    })
    .catch((err) => {
      logError(err.message);
    });
};

const createRepository = (config: CreateConfig) => {
  const { token, ...data } = config;
  axios
    .post("https://api.github.com/user/repos", data, {
      headers: getHeader(token!),
    })
    .then(() => {
      logSuccess("create a repository successfully");
    })
    .catch((err) => {
      logError(err.message);
    });
};

const deleteRepository = async (config: DeleteConfig) => {
  const { token, name } = config;
  git
    .listConfig()
    .then(({ files, values }) => {
      let username;
      for (let file of files) {
        const content = values[file];
        const value = content[USER_NAME_FILED];
        if (value) {
          username = value;
          break;
        }
      }
      if (!username) {
        logError("can't find user.name in git config");
        return;
      }
      axios
        .delete(`https://api.github.com/repos/${username}/${name}`, {
          headers: getHeader(token!),
        })
        .then(() => {
          logSuccess("delete a repository successfully");
        })
        .catch((err) => {
          logError(err.message);
        });
    })
    .catch((err) => {
      logError(err.message);
    });
};

export const handleCreateAction = async (
  name: string,
  options: DetailOptions
) => {
  const config = { name, ...options };
  handleAction(options.token, (token?: string) =>
    createRepository({ ...config, token })
  );
};

export const handleDeleteAction = async (
  name: string,
  options: BaseOptions
) => {
  const config = { name, ...options };
  handleAction(options.token, (token?: string) =>
    deleteRepository({ ...config, token })
  );
};

const handleAction = async (
  token: string | undefined,
  callback: HandleActionCallback
) => {
  if (token) {
    handleTokenAction(token);
    callback();
  } else {
    const cacheToken = await getTokenFromConfigFile();
    if (!cacheToken) {
      logError("need token to authenticate");
    } else {
      callback(cacheToken);
    }
  }
};
