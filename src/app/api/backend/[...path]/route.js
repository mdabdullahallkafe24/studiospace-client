const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

if (!BACKEND_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is missing.");
}

async function handler(request, context) {
  try {
    const { path } = await context.params;
    const search = new URL(request.url).search;

    const backendUrl = `${BACKEND_URL}/${path.join("/")}${search}`;

    const headers = new Headers();

    const cookie = request.headers.get("cookie");
    if (cookie) {
      headers.set("Cookie", cookie);
    }

    const contentType = request.headers.get("content-type");
    if (contentType) {
      headers.set("Content-Type", contentType);
    }

    const response = await fetch(backendUrl, {
      method: request.method,
      headers,
      body: ["GET", "HEAD"].includes(request.method)
        ? undefined
        : await request.text(),
      cache: "no-store",
    });

    const data = await response.text();

    return new Response(data, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") || "application/json",
      },
    });
  } catch (error) {
    return Response.json(
      { success: false, message: "Backend connection failed." },
      { status: 500 }
    );
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;