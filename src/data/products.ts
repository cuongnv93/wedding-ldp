import { productImages } from "./product-images";

export type Product = {
  id: number;
  name: string;
  reviews: number;
  new: boolean;
  stock: number;
  description: string;
  image: string;
  gallery: string[];
  linkRedirect: string;
  target: "web" | "mobile" | "web beautiful";
  isHot?: boolean;
  isFavourite?: boolean;
};

const baseProducts: Omit<Product, "image" | "gallery" | "linkRedirect">[] = [
  {
    id: 1,
    name: "Nike Air Max 270",
    reviews: 124,
    new: false,
    stock: 15,
    description:
      "Mẫu thiệp hiện đại, cá tính, phù hợp với các cặp đôi yêu thích sự năng động và trẻ trung. Thiết kế nổi bật, dễ dàng gây ấn tượng với khách mời.",
    target: "web",
    isHot: true,
  },
  {
    id: 2,
    name: "Adidas Ultraboost 22",
    new: true,
    stock: 20,
    reviews: 56,
    description:
      "Mẫu thiệp cưới sang trọng, tinh tế, mang lại cảm giác ấm áp và gần gũi cho ngày trọng đại của bạn. Phù hợp với những ai yêu thích sự tối giản mà vẫn nổi bật.",
    target: "web",
  },
  {
    id: 3,
    name: "Puma RS-X³ Puzzle",
    new: false,
    stock: 12,
    reviews: 56,
    description:
      "Mẫu thiệp cá tính, phá cách, dành cho các cặp đôi thích sự độc đáo và muốn tạo dấu ấn riêng trong ngày cưới.",
    target: "web",
    isFavourite: true,
  },
  {
    id: 4,
    name: "New Balance 574",
    reviews: 78,
    new: true,
    stock: 25,
    description:
      "Mẫu thiệp nhẹ nhàng, kể về quá trình quen và cưới nhau của hai bạn. Phù hợp với những ai yêu thích sự lãng mạn và truyền thống.",
    target: "web",
  },
  {
    id: 5,
    name: "Nike Air Jordan 1 Mid",
    reviews: 156,
    new: false,
    stock: 8,
    description:
      "Mẫu thiệp nổi bật, mạnh mẽ, dành cho các cặp đôi yêu thích phong cách cá tính và muốn tạo dấu ấn riêng trong ngày cưới.",
    target: "mobile",
  },
  {
    id: 6,
    name: "Adidas NMD R1",
    new: false,
    reviews: 156,
    stock: 18,
    description:
      "Mẫu thiệp hiện đại, tối giản, phù hợp với các cặp đôi yêu thích sự tinh tế và sang trọng. Giao diện thân thiện, dễ sử dụng cho mọi lứa tuổi.",
    target: "mobile",
    isFavourite: true,
  },
  {
    id: 7,
    name: "Puma Future Rider",
    reviews: 45,
    new: false,
    stock: 22,
    description:
      "Thiệp cưới phong cách retro, mang lại cảm giác hoài niệm và ấm áp. Họa tiết độc đáo, tạo dấu ấn riêng cho ngày trọng đại.",
    target: "mobile",
    isFavourite: true,
  },
  {
    id: 8,
    name: "New Balance 327",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "Mẫu thiệp trẻ trung, năng động, phù hợp với các cặp đôi yêu thích sự mới mẻ và sáng tạo. Thiết kế bắt mắt, dễ dàng thu hút mọi ánh nhìn.",
    target: "mobile",
  },
  {
    id: 9,
    name: "MB_005",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "Thiệp cưới với tông màu pastel nhẹ nhàng, mang lại cảm giác ngọt ngào và lãng mạn. Phù hợp cho những ai yêu thích sự dịu dàng.",
    target: "mobile",
    isFavourite: true,
  },
  {
    id: 10,
    name: "MB_006",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "Mẫu thiệp cá tính, phá cách, dành cho các cặp đôi muốn tạo dấu ấn riêng biệt trong ngày cưới của mình.",
    target: "mobile",
    isFavourite: true,
  },
  {
    id: 11,
    name: "MB_007",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "Thiệp cưới lấy cảm hứng từ thiên nhiên, với họa tiết hoa lá tươi tắn, mang lại cảm giác tươi mới và tràn đầy sức sống.",
    target: "mobile",
  },
  {
    id: 12,
    name: "MB_008",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "Mẫu thiệp sang trọng với điểm nhấn ánh vàng, phù hợp cho những lễ cưới đẳng cấp, thể hiện sự đầu tư và trân trọng khách mời.",
    target: "mobile",
  },
  {
    id: 13,
    name: "MB_009",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "Thiệp cưới phong cách tối giản, tập trung vào thông điệp yêu thương và sự gắn kết của hai bạn.",
    target: "mobile",
  },
  {
    id: 14,
    name: "MB_010",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "Mẫu thiệp với hiệu ứng màu nước mềm mại, tạo cảm giác nhẹ nhàng, bay bổng và đầy nghệ thuật cho ngày trọng đại.",
    target: "mobile",
  },
  {
    id: 15,
    name: "MB_011",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "Thiệp cưới hiện đại với dòng thời gian kể lại hành trình tình yêu của hai bạn, giúp khách mời cảm nhận được câu chuyện riêng biệt.",
    target: "mobile",
    isFavourite: true,
  },
  {
    id: 16,
    name: "MB_012",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "Mẫu thiệp lấy cảm hứng từ phim cổ điển, mang lại cảm giác hoài niệm và độc đáo, phù hợp với các cặp đôi yêu thích retro.",
    target: "mobile",
  },
  {
    id: 17,
    name: "MB_014",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "Thiệp cưới hoa lá rực rỡ, tươi vui, mang đến cảm giác hạnh phúc và tràn đầy sức sống cho ngày cưới của bạn.",
    target: "mobile",
  },
  {
    id: 18,
    name: "MB_015",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "Mẫu thiệp với họa tiết hình học hiện đại, phù hợp với các cặp đôi yêu thích sự sáng tạo và khác biệt.",
    target: "mobile",
    isFavourite: true,
  },
  {
    id: 19,
    name: "MB_016",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "Thiệp cưới lấy cảm hứng từ biển cả, với tông màu xanh mát và họa tiết sóng nước, mang lại cảm giác bình yên.",
    target: "mobile",
  },
  {
    id: 20,
    name: "MB_017",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "Mẫu thiệp với hình ảnh cặp đôi dễ thương, phù hợp với những ai yêu thích sự trẻ trung và vui tươi.",
    target: "mobile",
  },
  {
    id: 21,
    name: "MB_018",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "Thiệp cưới phong cách luxury, sử dụng chất liệu và hiệu ứng cao cấp, tạo ấn tượng mạnh với khách mời.",
    target: "mobile",
  },
  {
    id: 22,
    name: "MB_019",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "Mẫu thiệp với chủ đề du lịch, dành cho các cặp đôi yêu thích khám phá và muốn chia sẻ hành trình của mình.",
    target: "mobile",
  },
  {
    id: 23,
    name: "MB_020",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "Thiệp cưới lấy cảm hứng từ vũ trụ, với các họa tiết ngôi sao, mặt trăng, mang lại cảm giác huyền bí và lãng mạn.",
    target: "mobile",
  },
  {
    id: 24,
    name: "WEB_005",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "Mẫu thiệp với hiệu ứng chuyển động nhẹ nhàng, tạo cảm giác hiện đại và cuốn hút cho người nhận.",
    target: "web",
  },
  {
    id: 25,
    name: "MB_021",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "Thiệp cưới phong cách truyền thống, giữ nguyên nét đẹp văn hóa nhưng vẫn mang hơi thở hiện đại.",
    target: "mobile",
  },
  {
    id: 26,
    name: "WEB_006",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "Mẫu thiệp với hình ảnh hoa cưới, tượng trưng cho sự khởi đầu mới và hạnh phúc viên mãn.",
    target: "web",
  },
  {
    id: 27,
    name: "WEB_007",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "Thiệp cưới lấy cảm hứng từ truyện cổ tích, dành cho các cặp đôi muốn ngày cưới như một câu chuyện thần tiên.",
    target: "web",
  },
  {
    id: 28,
    name: "WEB_008",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "Mẫu thiệp với tông màu xanh lá, mang lại cảm giác tươi mát và gần gũi với thiên nhiên.",
    target: "web",
  },
  {
    id: 29,
    name: "MB_022",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "Thiệp cưới phong cách nghệ thuật, với các họa tiết vẽ tay độc đáo, tạo dấu ấn cá nhân cho cặp đôi.",
    target: "mobile",
  },
  {
    id: 30,
    name: "MB_023",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "Mẫu thiệp với chủ đề mùa xuân, mang lại cảm giác tươi mới, tràn đầy sức sống và hy vọng.",
    target: "mobile",
  },
  {
    id: 31,
    name: "WEB_009",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "Thiệp cưới lấy cảm hứng từ mùa thu, với tông màu vàng cam ấm áp, tạo cảm giác lãng mạn và ngọt ngào.",
    target: "web",
  },
  {
    id: 32,
    name: "MB_024",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "Mẫu thiệp với chủ đề mùa đông, mang lại cảm giác ấm áp, an lành và hạnh phúc viên mãn.",
    target: "mobile",
  },
  {
    id: 33,
    name: "MB_025",
    reviews: 67,

    new: true,
    stock: 15,
    description:
      "Thiệp cưới phong cách Boho, phóng khoáng, tự do, phù hợp với các cặp đôi cá tính.",
    target: "mobile",
  },
  {
    id: 34,
    name: "MB_026",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "Mẫu thiệp với họa tiết hoa anh đào, tượng trưng cho sự khởi đầu mới và tình yêu vĩnh cửu.",
    target: "mobile",
  },
  {
    id: 35,
    name: "WEB_010",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "Thiệp cưới lấy cảm hứng từ nghệ thuật mosaic, tạo nên sự độc đáo và nổi bật cho ngày cưới.",
    target: "web",
    isFavourite: true,
  },
  {
    id: 36,
    name: "MB_027",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "Mẫu thiệp với hiệu ứng ánh sáng lung linh, mang lại cảm giác huyền ảo và lãng mạn.",
    target: "mobile",
  },
  {
    id: 37,
    name: "MB_028",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "Thiệp cưới phong cách rustic, mộc mạc, gần gũi với thiên nhiên, phù hợp với các cặp đôi yêu thích sự giản dị.",
    target: "mobile",
  },
  {
    id: 38,
    name: "MB_029",
    reviews: 67,

    new: true,
    stock: 15,
    description:
      "Mẫu thiệp với chủ đề âm nhạc, dành cho các cặp đôi có chung niềm đam mê nghệ thuật.",
    target: "mobile",
    isFavourite: true,
  },
  {
    id: 39,
    name: "MB_030",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "Thiệp cưới lấy cảm hứng từ thành phố, với các họa tiết hiện đại, phù hợp với các cặp đôi trẻ trung, năng động.",
    target: "mobile",
  },
  {
    id: 40,
    name: "WEB_011",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "Mẫu thiệp với chủ đề biển đảo, mang lại cảm giác tự do, phóng khoáng và lãng mạn.",
    target: "web",
  },
  {
    id: 40,
    name: "MB_031",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "Thiệp cưới phong cách vintage, hoài cổ, phù hợp với các cặp đôi yêu thích sự tinh tế và sang trọng.",
    target: "mobile",
    isFavourite: true,
  },
  {
    id: 41,
    name: "MB_032",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "Mẫu thiệp với họa tiết lá vàng, tượng trưng cho sự bền vững và hạnh phúc lâu dài.",
    target: "mobile",
  },
  {
    id: 42,
    name: "WEB_012",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "Thiệp cưới lấy cảm hứng từ lễ hội, mang lại không khí vui tươi, rộn ràng cho ngày trọng đại.",
    target: "web",
  },
  {
    id: 43,
    name: "WEB_014",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "Mẫu thiệp với hiệu ứng 3D, tạo cảm giác sống động và ấn tượng mạnh với khách mời.",
    target: "web",
  },
  {
    id: 44,
    name: "WEB_015",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "Thiệp cưới phong cách nghệ thuật trừu tượng, phù hợp với các cặp đôi yêu thích sự sáng tạo và khác biệt.",
    target: "web",
    isFavourite: true,
  },
  {
    id: 45,
    name: "WEB_016",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "Mẫu thiệp với chủ đề vườn hoa, mang lại cảm giác tươi mới, tràn đầy sức sống và hạnh phúc.",
    target: "web",
  },
  {
    id: 46,
    name: "WEB_017",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "Thiệp cưới lấy cảm hứng từ những câu chuyện tình yêu nổi tiếng, gửi gắm lời chúc về một tương lai hạnh phúc và bền vững.",
    target: "web",
  },
  {
    id: 47,
    name: "WEB_018",
    reviews: 67,
    new: true,
    stock: 15,
    description:
      "New Balance 327 với thiết kế độc đáo và màu sắc nổi bật, tạo nên phong cách riêng biệt.",
    target: "web",
    isFavourite: true,
  },
];

export const products: Product[] = baseProducts.map((item) => ({
  ...item,
  image: productImages[item.name]?.main,
  gallery: productImages[item.name]?.gallery,
  linkRedirect: productImages[item.name]?.linkRedirect,
}));
