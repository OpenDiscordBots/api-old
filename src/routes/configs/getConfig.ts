import { RouteData } from "../../router";
import { createJSONResponse } from "../../utils/responses";

export async function getGuildConfig(request: Request, data: RouteData): Promise<Response> {
  const { id, module } = data;

  if (!id || !module) {
    return new Response(null, { status: 400 });
  }

  const value = await ODB.get(`guilds.${id}.${module}`);

  if (!value) {
    return new Response(null, { status: 404 });
  }

  return createJSONResponse(JSON.parse(value));
}
