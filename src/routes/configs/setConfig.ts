import { RouteData } from "../../router";

export async function setGuildConfig(request: Request, data: RouteData): Promise<Response> {
  const { id, module } = data;

  if (!id || !module) {
    return new Response(null, { status: 400 });
  }

  await ODB.put(`guilds.${id}.${module}`, await request.text());

  return new Response(null, { status: 204 });
}
