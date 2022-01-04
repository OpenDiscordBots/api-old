import { RouteData } from "../../router";
import { createJSONResponse } from "../../utils/responses";

export async function getKv(request: Request, data: RouteData): Promise<Response> {
  const { key } = data;

  if (!key) {
    return new Response(null, { status: 400 });
  }

  const value = await ODB.get(key as string);

  if (!value) {
    return new Response(null, { status: 404 });
  }

  return createJSONResponse(JSON.parse(value));
}
