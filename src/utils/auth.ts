export function bufferToHex(buffer: ArrayBuffer): string {
  return [...new Uint8Array(buffer)].map(b => b.toString(16).padStart(2, "0")).join("");
}

export async function sha256(data: string): Promise<string> {
  const auth = new TextEncoder().encode(data);
  const digest = await crypto.subtle.digest({ name: "SHA-256" }, auth);

  return bufferToHex(digest);
}

export async function isAuthenticated(request: Request): Promise<boolean> {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader) {
    return false;
  }

  if ((await sha256(authHeader)) === (await sha256(API_KEY))) {
    return true;
  }

  return false;
}
