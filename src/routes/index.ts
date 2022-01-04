import { RouteHandlers } from "../router";
import { configHandlers } from "./configs";
import { KVHandlers } from "./kv";

export const handlers: RouteHandlers = [...KVHandlers, ...configHandlers];
