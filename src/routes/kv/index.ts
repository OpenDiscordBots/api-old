import { RouteHandlers } from "../../router";
import { getKv } from "./getKv";
import { setKv } from "./setKv";

export const KVHandlers: RouteHandlers = [
  {
    method: "GET",
    path: "/kv/:skey",
    handler: getKv,
  },
  {
    method: "POST",
    path: "/kv/:skey",
    handler: setKv,
  },
];
