import { RouteHandlers } from "../../router";
import { getGuildConfig } from "./getConfig";
import { setGuildConfig } from "./setConfig";

export const configHandlers: RouteHandlers = [
  {
    method: "GET",
    path: "/guilds/:sid/config/:module",
    handler: getGuildConfig,
  },
  {
    method: "POST",
    path: "/guilds/:sid/config/:module",
    handler: setGuildConfig,
  },
];
