import { RouteData } from "../../router";

export async function setKv(request: Request, data: RouteData): Promise<Response> {
  const { key } = data;

  if (!key) {
    return new Response(null, { status: 400 });
  }

  await ODB.put(key as string, await request.text());

  return new Response(null, { status: 204 });
}
