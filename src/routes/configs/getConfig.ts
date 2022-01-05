import { RouteData } from "../../router";

export async function getGuildConfig(request: Request, data: RouteData): Promise<Response> {
  const { id, module } = data;

  if (!id || !module) {
    return new Response(null, { status: 400 });
  }

  const value = await ODB.get(`guilds.${id}.${module}`);

  if (!value) {
    return new Response(null, { status: 404 });
  }

  return new Response(JSON.parse(value), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
}
