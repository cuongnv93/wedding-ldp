import { NextResponse } from "next/server";
import { Product, products } from "@/data/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get("urlId") || "", 10);
  const product: Product | undefined = products.find((p) => p.id === id);

  if (!product) {
    return new NextResponse("Không tìm thấy thiệp", { status: 404 });
  }

  try {
    const resp = await fetch(product.linkRedirect);
    let html = await resp.text();

    const urlObj = new URL(product.linkRedirect);
    const origin = urlObj.origin;
    const basePath = urlObj.pathname.replace(/\/[^\/]*$/, "/");

    // ✅ Thêm base tag vào head
    html = html.replace(/<head[^>]*>/i, (match) => {
      return `${match}<base href="${origin}${basePath}">`;
    });

    // ✅ OPTIONAL: fallback sửa thêm src/href tuyệt đối (nếu cần)
    html = html.replace(/(src|href)=["']\/(?!\/)/g, `$1="${origin}/`);

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html",
        "Cache-Control": "no-cache",
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return new NextResponse("Không thể tải thiệp", { status: 500 });
  }
}
