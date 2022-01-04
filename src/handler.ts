import { Router } from "./router";
import { isAuthenticated } from "./utils/auth";
import { handlers } from "./routes";

const router = new Router();

for (const handler of handlers) {
  router.add(handler.method, handler.path.split("/"), handler.handler);
}

export async function handleRequest(request: Request): Promise<Response> {
  const { pathname } = new URL(request.url);

  const found = router.find(request.method.toUpperCase(), pathname);

  if (!found) {
    return new Response(null, { status: 404 });
  }

  if (!(await isAuthenticated(request))) {
    return new Response(null, { status: 401 });
  }

  const { route, res } = found;

  return await route.callback(request, res);
}
