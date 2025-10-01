import { NextResponse } from "next/server";
import { Product, products } from "@/data/products";

export const runtime = "edge"; // chạy Edge nếu deploy Vercel

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get("urlId") || "", 10);
  const product: Product | undefined = products.find((p) => p.id === id);

  if (!product) {
    return new NextResponse("Không tìm thấy thiệp", { status: 404 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2000);

  try {
    const resp = await fetch(product.linkRedirect, {
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!resp.ok) {
      return new NextResponse("Không thể tải thiệp", { status: 503 });
    }

    let html = await resp.text();
    const urlObj = new URL(product.linkRedirect);
    const origin = urlObj.origin;
    const basePath = urlObj.pathname.replace(/\/[^\/]*$/, "/");
    const baseTag = `<base href="${origin}${basePath}">`;
    const encodedBase = Buffer.from(baseTag).toString("base64");
    html = html.replace(/<head[^>]*>/i, (match) => {
      return `${match}<script>document.write(atob("${encodedBase}"))</script>`;
    });

    html = html.replace(/(src|href)=["']\/(?!\/)/g, `$1="${origin}/`);
    // const baseTag = `<base href="${origin}${basePath}">`;
    // const encodedBase = Buffer.from(baseTag).toString("base64");

    // html = html.replace(/<head[^>]*>/i, (match) => {
    //   return `${match}<script>document.write(atob("${encodedBase}"))</script>`;
    // });

    // html = html.replace(/(src|href)=["']\/(?!\/)/g, `$1="${origin}/`);

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html",
        "Cache-Control": "no-cache",
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    clearTimeout(timeout);
    return new NextResponse("Timeout hoặc lỗi proxy", { status: 504 });
  }
}
