import axios from "axios";
import { getHeader } from "./util";
import { CreateConfig } from "./type";

const request = axios.create({ baseURL: "https://api.github.com" });

export const getRepoApi = (data: CreateConfig, token: string) => {
  return request.post("/user/repos", data, {
    headers: getHeader(token),
  });
};

export const deleteRepoApi = (
  username: string,
  name: string,
  token: string
) => {
  return request.delete(`/repos/${username}/${name}`, {
    headers: getHeader(token),
  });
};
