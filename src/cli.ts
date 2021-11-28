import cac from "cac";
import { handleCreateAction } from "./core";
import { logError } from "./util";

import type { ErrorType } from "./type";

const cli = cac("gh-action");

cli
  .command("create <name>", "create a github repository")
  .option("--token <token>", "personal access token")
  .option(
    "--description <description>",
    "a short description of the repository"
  )
  .option("--private", "whether the repository is private")
  .action(handleCreateAction);

cli.help();

cli.version(require("../package.json").version);

try {
  cli.parse();
} catch (err) {
  logError((err as ErrorType).message);
}
