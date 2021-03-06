import { RouteData } from "../../router";

export async function getKv(request: Request, data: RouteData): Promise<Response> {
  const { key } = data;

  if (!key) {
    return new Response(null, { status: 400 });
  }

  const value = await ODB.get(key as string);

  if (!value) {
    return new Response(null, { status: 404 });
  }

  return new Response(value, {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
}
