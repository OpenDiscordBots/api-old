export async function createJSONResponse(body?: Record<string, unknown>, status = 200): Promise<Response> {
  return new Response(JSON.stringify(body), {
    headers: {
      "Content-Type": "application/json",
    },
    status: status,
  });
}
