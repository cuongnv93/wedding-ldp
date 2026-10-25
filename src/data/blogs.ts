export type BlogCategory =
  | "Cẩm nang cưới"
  | "Mẫu thiệp cưới"
  | "Mẹo & Xu hướng"
  | "Lời chúc & Thiệp mời";

export type BlogAuthor = {
  name: string;
  role: string;
  avatar: string;
};

export type BlogTOC = {
  id: string;
  title: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  updatedAt: string;
  author: BlogAuthor;
  category: BlogCategory;
  readTime: string;
  tags: string[];
  toc: BlogTOC[];
  contentHtml: string;
};

export const defaultAuthor: BlogAuthor = {
  name: "Ban Biên Tập uWedding",
  role: "Chuyên gia Thiệp cưới & Sự kiện",
  avatar: "/favicon.png",
};

export const blogs: BlogPost[] = [
  {
    id: "blog-1",
    slug: "top-mau-thiep-cuoi-online-dep-nhat-2025-2026",
    title: "Top 15+ Mẫu Thiệp Cưới Online Đẹp, Sang Trọng Xu Hướng 2025 - 2026",
    description:
      "Khám phá các mẫu thiệp cưới online đẹp và sang trọng nhất mùa cưới 2025 - 2026. Thiết kế hiện đại, tích hợp nhạc nền, bản đồ, đếm ngược và mã QR mừng cưới.",
    excerpt:
      "Tổng hợp những thiết kế thiệp cưới điện tử được các cặp đôi săn đón nhất hiện nay, từ phong cách tối giản Minimalism đến lãng mạn Hàn Quốc.",
    coverImage: "/image/anh-bia-thiep-xinh.jpg",
    publishedAt: "2026-01-15T08:00:00Z",
    updatedAt: "2026-10-25T08:00:00Z",
    author: defaultAuthor,
    category: "Mẫu thiệp cưới",
    readTime: "6 phút đọc",
    tags: ["mẫu thiệp cưới online đẹp", "thiệp cưới online 2025", "thiệp cưới điện tử", "xu hướng thiệp cưới"],
    toc: [
      { id: "xu-huong-thiep-cuoi-online", title: "1. Xu hướng thiệp cưới online lên ngôi mùa cưới 2025 - 2026" },
      { id: "top-mau-thiep-sang-trong", title: "2. Điểm danh các mẫu thiệp cưới online sang trọng nổi bật" },
      { id: "tinh-nang-can-co", title: "3. Các tính năng không thể thiếu trên một mẫu thiệp cưới đẹp" },
      { id: "chon-mau-phu-hop", title: "4. Bí quyết chọn mẫu thiệp cưới online phù hợp phong cách tiệc cưới" },
      { id: "ket-luan", title: "5. Lời kết và cách đặt thiệp cưới online nhanh nhất" },
    ],
    contentHtml: `
      <p class="lead">Trong thời đại công nghệ số, <strong>thiệp cưới online</strong> (thiệp cưới điện tử) đang trở thành sự lựa chọn hàng đầu của các cặp đôi trẻ thế hệ Gen Z và Millennials. Không chỉ giúp tiết kiệm tới 80% chi phí so với thiệp in truyền thống, thiệp cưới trực tuyến còn mang lại trải nghiệm tương tác trực quan, sống động và vô cùng tiện lợi cho khách mời.</p>

      <h2 id="xu-huong-thiep-cuoi-online">1. Xu hướng thiệp cưới online lên ngôi mùa cưới 2025 - 2026</h2>
      <p>Nếu như trước đây, thiệp cưới giấy là phương thức duy nhất để báo hỷ, thì ngày nay các nền tảng tạo website thiệp cưới như <strong>uWedding</strong> đã mang lại một làn gió hoàn toàn mới mẻ. Thiệp cưới trực tuyến không chỉ đơn thuần là một bức ảnh tĩnh, mà là một trang web đám cưới mini được cá nhân hóa hoàn toàn với câu chuyện tình yêu, album ảnh cưới, video pre-wedding và âm nhạc du dương.</p>
      <p>Đặc biệt trong năm 2025 - 2026, các phong cách thiết kế sau đang dẫn đầu bảng xếp hạng thịnh hành:</p>
      <ul>
        <li><strong>Phong cách Tối giản (Minimalism):</strong> Tông màu trắng, be, kem với font chữ thanh lịch, tập trung vào thông điệp và hình ảnh cô dâu chú rể.</li>
        <li><strong>Phong cách Lãng mạn Hàn Quốc (Pastel Romance):</strong> Sử dụng gam màu hồng pastel, xanh mint, tạo cảm giác ngọt ngào và bay bổng.</li>
        <li><strong>Phong cách Sang trọng Cổ điển (Classic Luxury):</strong> Điểm xuyết viền vàng ánh kim, phong cách quý tộc châu Âu tinh tế.</li>
        <li><strong>Phong cách Chữ ký số & 3D hiện đại:</strong> Giao diện tương tác lật mở trang thiệp như thật, tích hợp hiệu ứng hoa rơi lãng mạn.</li>
      </ul>

      <h2 id="top-mau-thiep-sang-trong">2. Điểm danh các mẫu thiệp cưới online sang trọng nổi bật</h2>
      <p>Tại kho giao diện của uWedding, bạn có thể dễ dàng khám phá hàng chục thiết kế được tối ưu riêng cho từng thiết bị di động và máy tính:</p>
      <ul>
        <li><strong>Mẫu WEB_001 & WEB_002:</strong> Thiết kế dạng website cuộn dài hiện đại, phù hợp cho cặp đôi có bộ ảnh cưới ngoại cảnh lung linh.</li>
        <li><strong>Mẫu MB_001 đến MB_010:</strong> Thiết kế tối ưu 100% cho màn hình điện thoại thông minh, lướt mượt mà, chạm mở từng phần cực kỳ tiện lợi.</li>
        <li><strong>Mẫu Chữ ký số CHUKY_001:</strong> Trải nghiệm độc đáo nơi khách mời có thể ký tên chúc phúc trực tiếp lên thiệp cưới.</li>
      </ul>

      <h2 id="tinh-nang-can-co">3. Các tính năng không thể thiếu trên một mẫu thiệp cưới đẹp</h2>
      <p>Một mẫu thiệp cưới online đạt chuẩn chất lượng cao cần đáp ứng các tiêu chí tính năng hiện đại sau:</p>
      <ol>
        <li><strong>Bản đồ chỉ đường Google Maps:</strong> Định vị chính xác địa chỉ nhà trai, nhà gái và trung tâm tiệc cưới, khách chỉ cần bấm 1 chạm là mở ứng dụng dẫn đường.</li>
        <li><strong>Đếm ngược ngày cưới (Countdown Timer):</strong> Nhắc nhở quan khách về thời khắc thiêng liêng đang đến gần.</li>
        <li><strong>Nhạc nền tự động:</strong> Những bản tình ca ngọt ngào phát khi mở thiệp tạo cảm xúc trọn vẹn.</li>
        <li><strong>Xác nhận tham dự (RSVP):</strong> Khách mời phản hồi đi 1 người, 2 người hay có trẻ em, giúp gia đình chốt số lượng mâm cỗ chuẩn xác.</li>
        <li><strong>Mã QR mừng cưới tiện lợi:</strong> Giúp bạn bè, người thân ở xa có thể gửi lời chúc và tiền mừng cưới một cách lịch sự, tinh tế.</li>
      </ol>

      <h2 id="chon-mau-phu-hop">4. Bí quyết chọn mẫu thiệp cưới online phù hợp phong cách tiệc cưới</h2>
      <p>Để mẫu thiệp cưới tạo ấn tượng mạnh nhất, bạn nên lựa chọn mẫu có tông màu đồng bộ với concept trang trí hôn lễ (ví dụ: tiệc cưới bãi biển nên chọn tone xanh biển, tiệc ngoài trời nên chọn tone xanh lá thiên nhiên, tiệc khách sạn sang trọng nên chọn tone đỏ rượu hoặc vàng gold).</p>

      <h2 id="ket-luan">5. Lời kết và cách đặt thiệp cưới online nhanh nhất</h2>
      <p>Khám phá ngay hơn 50+ mẫu thiệp cưới online đẹp nhất tại uWedding để biến ngày trọng đại của bạn trở thành kỷ niệm khó quên trong lòng khách mời.</p>
    `,
  },
  {
    id: "blog-2",
    slug: "huong-dan-tao-thiep-cuoi-online-mien-phi-chi-tiet",
    title: "Hướng Dẫn Cách Tự Tạo Thiệp Cưới Online Miễn Phí Từ A-Z Cho Cặp Đôi",
    description:
      "Từng bước tạo thiệp cưới online miễn phí, nhanh chóng trong 5 phút. Không cần biết lập trình hay đồ họa, có ngay link thiệp cưới điện tử đẹp lung linh.",
    excerpt:
      "Không cần biết thiết kế hay code, bạn hoàn toàn có thể tự tạo cho mình một website thiệp cưới online đẹp mắt, đầy đủ tính năng chỉ trong vài phút.",
    coverImage: "/image/weddingmobile1.png",
    publishedAt: "2026-01-20T08:00:00Z",
    updatedAt: "2026-10-25T08:00:00Z",
    author: defaultAuthor,
    category: "Cẩm nang cưới",
    readTime: "7 phút đọc",
    tags: ["tạo thiệp cưới online miễn phí", "cách làm thiệp cưới online", "hướng dẫn làm thiệp cưới", "tự làm website đám cưới"],
    toc: [
      { id: "chuan-bi-truoc-khi-tao", title: "1. Cần chuẩn bị những gì trước khi tạo thiệp cưới online?" },
      { id: "quy-trinh-5-buoc", title: "2. Quy trình 5 bước tạo thiệp cưới online trên uWedding" },
      { id: "tuy-chinh-noi-dung", title: "3. Cách tùy chỉnh thông tin, ảnh cưới và nhạc nền chuẩn đẹp" },
      { id: "luu-y-khi-chia-se", title: "4. Lưu ý khi chia sẻ link thiệp tới người thân và bạn bè" },
      { id: "cau-hoi-thuong-gap", title: "5. Các câu hỏi thường gặp khi tạo thiệp cưới online miễn phí" },
    ],
    contentHtml: `
      <p class="lead">Bạn đang tìm cách <strong>tạo thiệp cưới online miễn phí</strong> nhưng lo lắng vì mình không am hiểu về công nghệ hay thiết kế? Đừng lo lắng! Với nền tảng uWedding, bạn có thể tự tay tạo ra chiếc thiệp cưới điện tử lung linh chỉ sau 5 phút thao tác cực kỳ đơn giản.</p>

      <h2 id="chuan-bi-truoc-khi-tao">1. Cần chuẩn bị những gì trước khi tạo thiệp cưới online?</h2>
      <p>Trước khi bắt đầu, hãy chuẩn bị sẵn các thông tin sau vào một file ghi chú để việc tạo thiệp diễn ra nhanh chóng nhất:</p>
      <ul>
        <li><strong>Thông tin cơ bản:</strong> Họ tên cô dâu chú rể, họ tên song thân hai bên gia đình.</li>
        <li><strong>Thời gian & địa điểm:</strong> Giờ giấc tổ chức lễ Vu quy, lễ Thành hôn, tiệc cưới và địa chỉ chính xác kèm tên nhà hàng/tư gia.</li>
        <li><strong>Hình ảnh cưới:</strong> 1 ảnh đại diện làm ảnh bìa thiệp (chất lượng cao) và 5 - 15 ảnh cưới đẹp nhất cho album ảnh trực tuyến.</li>
        <li><strong>Bài hát yêu thích:</strong> Tên bài hát tình yêu bạn muốn phát làm nhạc nền (ví dụ: *I Do, Cưới Nhau Đi, Nơi Này Có Anh...*).</li>
        <li><strong>Thông tin tài khoản ngân hàng (nếu có):</strong> Số tài khoản và tên ngân hàng để tự động tạo mã QR mừng cưới.</li>
      </ul>

      <h2 id="quy-trinh-5-buoc">2. Quy trình 5 bước tạo thiệp cưới online trên uWedding</h2>
      <ol>
        <li><strong>Bước 1: Chọn mẫu thiệp cưới ưng ý:</strong> Truy cập kho mẫu thiệp cưới tại <a href="/vi/products">Danh sách mẫu thiệp uWedding</a> và bấm xem trước để tìm phong cách bạn yêu thích nhất.</li>
        <li><strong>Bước 2: Gửi thông tin & ảnh cưới:</strong> Nhập các thông tin cô dâu chú rể và tải album ảnh cưới lên hệ thống.</li>
        <li><strong>Bước 3: Xem trước bản demo:</strong> Hệ thống tự động tạo ra link demo để bạn kiểm tra từng chi tiết chữ, ngày giờ, vị trí bản đồ chỉ đường.</li>
        <li><strong>Bước 4: Điều chỉnh theo ý thích:</strong> Nếu muốn thay đổi câu từ hoặc đổi ảnh, bạn có thể yêu cầu chỉnh sửa hoàn toàn miễn phí.</li>
        <li><strong>Bước 5: Nhận link & mã QR chia sẻ:</strong> Sau khi hoàn tất, bạn sẽ nhận được đường link chính thức kèm mã QR để gửi qua Zalo, Facebook, tin nhắn SMS.</li>
      </ol>

      <h2 id="tuy-chinh-noi-dung">3. Cách tùy chỉnh thông tin, ảnh cưới và nhạc nền chuẩn đẹp</h2>
      <p>Để thiệp hiển thị đẹp mắt nhất trên mọi kích thước màn hình smartphone, bạn nên chọn ảnh dọc tỷ lệ 3:4 hoặc 9:16 cho ảnh bìa. Dung lượng ảnh nên tối ưu dưới 2MB để khách mở thiệp với tốc độ 0.5 giây không phải chờ đợi.</p>

      <h2 id="luu-y-khi-chia-se">4. Lưu ý khi chia sẻ link thiệp tới người thân và bạn bè</h2>
      <p>Khi gửi link thiệp qua Zalo hoặc Messenger, hãy kèm theo một lời chào trang trọng hoặc sử dụng tính năng <a href="/vi/create-name-invitation">Tạo thiệp gắn tên khách mời</a> để mỗi vị khách đều nhận được một đường link mang tên riêng của chính mình, ví dụ: <em>Kính mời Anh Tuấn & Người Thương</em>.</p>

      <h2 id="cau-hoi-thuong-gap">5. Các câu hỏi thường gặp khi tạo thiệp cưới online miễn phí</h2>
      <p><strong>Thiệp cưới online có thời hạn sử dụng bao lâu?</strong> Tại gói cơ bản của uWedding, thiệp cưới của bạn được lưu trữ an toàn ít nhất 1 năm, đảm bảo bạn luôn có thể mở lại để ôn lại kỷ niệm ngày cưới bất cứ lúc nào.</p>
    `,
  },
  {
    id: "blog-3",
    slug: "loi-chuc-va-loi-moi-cuoi-online-hay-y-nghia",
    title: "Tuyển Tập 50+ Lời Mời Cưới Online Hay, Tinh Tế & Lịch Sự Qua Zalo, Facebook",
    description:
      "Tổng hợp các mẫu lời mời cưới online hay, ngắn gọn, hài hước và trang trọng khi gửi thiệp cưới điện tử qua Zalo, Messenger, SMS cho bạn bè, đồng nghiệp.",
    excerpt:
      "Gợi ý những câu viết lời mời đám cưới online khéo léo, duyên dáng và ấm áp nhất khi gửi link thiệp cưới điện tử đến từng nhóm đối tượng khách mời.",
    coverImage: "/image/wedding1.cuongvalan.click.png",
    publishedAt: "2026-02-01T08:00:00Z",
    updatedAt: "2026-10-25T08:00:00Z",
    author: defaultAuthor,
    category: "Lời chúc & Thiệp mời",
    readTime: "8 phút đọc",
    tags: ["lời mời cưới online", "lời mời đám cưới qua zalo", "cách mời cưới qua facebook", "tin nhắn mời cưới hay"],
    toc: [
      { id: "tam-quan-trong-loi-moi", title: "1. Tầm quan trọng của lời mời khi gửi thiệp cưới online" },
      { id: "loi-moi-ban-be-than-thiet", title: "2. Mẫu lời mời cưới online vui vẻ, hài hước cho bạn bè" },
      { id: "loi-moi-dong-nghiep-doi-tac", title: "3. Mẫu lời mời cưới lịch thiệp cho đồng nghiệp, sếp và đối tác" },
      { id: "loi-moi-ho-hang-nguoi-lon", title: "4. Mẫu lời mời trang trọng gửi họ hàng, người lớn tuổi ở xa" },
      { id: "loi-khuyen-khi-gui-loi-moi", title: "5. Những điều cần tránh khi gửi thiệp cưới online qua mạng xã hội" },
    ],
    contentHtml: `
      <p class="lead">Gửi <strong>thiệp cưới online</strong> qua Zalo hay Facebook ngày nay đã rất phổ biến, nhưng làm thế nào để lời mời vẫn giữ được sự ấm áp, trang trọng mà không bị xem là thiếu chu đáo? Dưới đây là bộ sưu tập hơn 50 mẫu lời mời cưới được biên soạn chỉn chu theo từng nhóm khách mời.</p>

      <h2 id="tam-quan-trong-loi-moi">1. Tầm quan trọng của lời mời khi gửi thiệp cưới online</h2>
      <p>Đừng bao giờ chỉ gửi trơ trọi một đường link thiệp cưới mà không có lời nhắn đi kèm! Một lời nhắn chân thành, được gọi tên riêng rõ ràng sẽ khiến người nhận cảm nhận được sự trân trọng và niềm vui muốn chia sẻ của bạn.</p>

      <h2 id="loi-moi-ban-be-than-thiet">2. Mẫu lời mời cưới online vui vẻ, hài hước cho bạn bè</h2>
      <div class="bg-gray-50 p-4 rounded-xl border border-gray-200 my-4">
        <p><strong>Mẫu 1:</strong> <em>"Alo bạn thân mến ơi! Sau bao năm tháng cùng nhau thanh xuân, cuối cùng mình cũng chính thức 'lên xe hoa' rồi. Sự hiện diện của bạn là niềm vinh hạnh to lớn cho vợ chồng mình. Mời bạn bấm vào thiệp cưới online để xem chi tiết thời gian và địa điểm nhé: [Link Thiệp]!"</em></p>
        <p><strong>Mẫu 2:</strong> <em>"Người ta bảo tình yêu là chuyến phiêu lưu, và tụi mình quyết định cùng nhau đi hết đời! Mời bạn đến chung vui và 'cháy' hết mình trong ngày cưới của tụi mình nha: [Link Thiệp]!"</em></p>
      </div>

      <h2 id="loi-moi-dong-nghiep-doi-tac">3. Mẫu lời mời cưới lịch thiệp cho đồng nghiệp, sếp và đối tác</h2>
      <div class="bg-gray-50 p-4 rounded-xl border border-gray-200 my-4">
        <p><strong>Mẫu 1:</strong> <em>"Dạ em chào Anh/Chị [Tên] ạ. Vào ngày [Ngày] tới đây, em và gia đình tổ chức lễ thành hôn. Em trân trọng kính mời Anh/Chị và người thương đến dự bữa cơm thân mật chung vui cùng gia đình em. Em xin phép gửi tấm thiệp cưới điện tử với đầy đủ thông tin địa điểm và bản đồ chỉ đường tại đây ạ: [Link Thiệp]. Rất mong được đón tiếp Anh/Chị ạ!"</em></p>
      </div>

      <h2 id="loi-moi-ho-hang-nguoi-lon">4. Mẫu lời mời trang trọng gửi họ hàng, người lớn tuổi ở xa</h2>
      <p>Đối với cô chú, bác hoặc họ hàng ở xa không tiện gửi thiệp giấy tận tay, hãy gọi điện thoại hỏi thăm trước một cuộc ngắn, sau đó gửi link thiệp online kèm lời nhắn:</p>
      <div class="bg-gray-50 p-4 rounded-xl border border-gray-200 my-4">
        <p><em>"Dạ thưa Cô/Chú, do khoảng cách địa lý ở xa nên cháu chưa thể trực tiếp trao tận tay tấm thiệp mời bằng giấy. Cháu xin phép kính gửi Cô/Chú tấm thiệp cưới online của hai cháu. Kính chúc Cô/Chú luôn dồi dào sức khỏe và gia đình hai cháu rất vinh hạnh được đón tiếp Cô/Chú trong ngày vui sắp tới ạ: [Link Thiệp]."</em></p>
      </div>

      <h2 id="loi-khuyen-khi-gui-loi-moi">5. Những điều cần tránh khi gửi thiệp cưới online qua mạng xã hội</h2>
      <ul>
        <li>Không gửi tin nhắn hàng loạt bằng hình thức spam nhóm chung.</li>
        <li>Nên gửi thiệp trước ngày cưới từ 2 đến 3 tuần để khách chủ động sắp xếp thời gian.</li>
        <li>Tận dụng tính năng gắn tên khách mời riêng biệt để mỗi thiệp đều là độc nhất.</li>
      </ul>
    `,
  },
  {
    id: "blog-4",
    slug: "thiep-cuoi-online-la-gi-co-nen-dung",
    title: "Thiệp Cưới Online Là Gì? Có Nên Thay Thế Hoàn Toàn Thiệp Cưới Giấy Truyền Thống?",
    description:
      "Phân tích ưu nhược điểm của thiệp cưới online và thiệp cưới giấy truyền thống. Xu hướng kết hợp thông minh giúp tiết kiệm chi phí và thể hiện đẳng cấp.",
    excerpt:
      "Liệu thiệp cưới điện tử có làm mất đi nét đẹp truyền thống của ngày cưới? Cùng tìm hiểu ưu nhược điểm và giải pháp kết hợp hoàn hảo cho các cặp đôi hiện đại.",
    coverImage: "/image/weddingmobile2.png",
    publishedAt: "2026-02-05T08:00:00Z",
    updatedAt: "2026-10-25T08:00:00Z",
    author: defaultAuthor,
    category: "Cẩm nang cưới",
    readTime: "6 phút đọc",
    tags: ["thiệp cưới online là gì", "so sánh thiệp cưới giấy và online", "ưu điểm thiệp cưới điện tử", "wedding website"],
    toc: [
      { id: "dinh-nghia", title: "1. Thiệp cưới online (thiệp cưới điện tử) là gì?" },
      { id: "uu-diem-noi-bat", title: "2. Những ưu điểm vượt trội của thiệp cưới online" },
      { id: "co-nen-thay-the", title: "3. Có nên bỏ hẳn thiệp cưới giấy truyền thống không?" },
      { id: "giai-phap-hybrid", title: "4. Giải pháp kết hợp 'Hybrid': In mã QR lên thiệp giấy" },
    ],
    contentHtml: `
      <p class="lead">Nhiều cặp đôi chuẩn bị kết hôn thường băn khoăn: <em>"Liệu gửi thiệp cưới online có bị người lớn chê trách là thiếu trang trọng không? Có nên bỏ hẳn thiệp giấy truyền thống?"</em> Hãy cùng phân tích chi tiết bản chất và xu hướng mới này.</p>

      <h2 id="dinh-nghia">1. Thiệp cưới online (thiệp cưới điện tử) là gì?</h2>
      <p><strong>Thiệp cưới online</strong> (hay còn gọi là Digital Wedding Invitation, Wedding Website) là một trang web cưới chuyên biệt được thiết kế riêng cho cô dâu và chú rể. Khác với một bức ảnh thiệp chụp thông thường, thiệp cưới online là một ứng dụng web đa phương tiện tích hợp:</p>
      <ul>
        <li>Album ảnh cưới sắc nét với hiệu ứng chuyển động mượt mà.</li>
        <li>Bản đồ định vị chỉ đường bằng Google Maps chính xác từng mét.</li>
        <li>Nhạc nền lãng mạn du dương phát theo ý thích.</li>
        <li>Bộ đếm ngược thời gian đến ngày cưới.</li>
        <li>Hộp thư xác nhận tham dự (RSVP) và gửi lời chúc mừng trực tiếp.</li>
      </ul>

      <h2 id="uu-diem-noi-bat">2. Những ưu điểm vượt trội của thiệp cưới online</h2>
      <ol>
        <li><strong>Tiết kiệm ngân sách khổng lồ:</strong> In 500 thiệp giấy cao cấp có thể tiêu tốn từ 3 đến 8 triệu đồng. Trong khi tạo thiệp cưới online chỉ tốn từ 0đ đến vài trăm nghìn đồng không giới hạn số lượng gửi.</li>
        <li><strong>Bảo vệ môi trường:</strong> Không lãng phí giấy in, không rác thải sau ngày cưới.</li>
        <li><strong>Không sợ thất lạc, sai sót:</strong> Nếu có thay đổi về giờ giấc hoặc địa điểm, bạn có thể chỉnh sửa ngay lập tức trên web trong 30 giây mà không phải in lại toàn bộ.</li>
        <li><strong>Gửi đi toàn cầu tức thì:</strong> Khách mời ở nước ngoài, ở xa đều nhận được thiệp ngay trong tích tắc qua link và mã QR.</li>
      </ol>

      <h2 id="co-nen-thay-the">3. Có nên bỏ hẳn thiệp cưới giấy truyền thống không?</h2>
      <p>Câu trả lời là: <strong>Tùy thuộc vào đối tượng khách mời</strong>. Với bạn bè, đồng nghiệp trẻ, họ hàng ở xa, thiệp online là lựa chọn lý tưởng số 1. Tuy nhiên với ông bà, các bậc cao niên hoặc quan khách cao cấp trong dòng họ, một tấm thiệp giấy trao tay truyền thống vẫn thể hiện sự kính trọng truyền thống.</p>

      <h2 id="giai-phap-hybrid">4. Giải pháp kết hợp 'Hybrid': In mã QR lên thiệp giấy</h2>
      <p>Giải pháp thông minh nhất hiện nay là: In một lượng nhỏ thiệp giấy truyền thống, và <strong>in kèm mã QR dẫn đến thiệp cưới online uWedding</strong> ngay trên thiệp giấy. Khi đó, người lớn vẫn có thiệp giấy cầm tay, còn bạn bè chỉ cần quét mã QR là xem được trọn vẹn album ảnh, nghe nhạc và bấm định vị đường đi tới nhà hàng!</p>
    `,
  },
  {
    id: "blog-5",
    slug: "cach-tao-ma-qr-mung-cuoi-tren-thiep-online",
    title: "Cách Tạo Mã QR Mừng Cưới & Hộp Tiền Mừng Tinh Tế Trên Thiệp Cưới Online",
    description:
      "Hướng dẫn tích hợp mã QR ngân hàng mừng cưới lên thiệp cưới điện tử khéo léo, tinh tế, không gây phản cảm. Cách tạo mã VietQR tự động điền số tài khoản.",
    excerpt:
      "Tích hợp mã QR mừng cưới lên thiệp cưới online sao cho lịch sự, văn minh và thuận tiện nhất cho khách mời ở xa không thể tham dự trực tiếp.",
    coverImage: "/image/weddingmobile3.png",
    publishedAt: "2026-02-10T08:00:00Z",
    updatedAt: "2026-10-25T08:00:00Z",
    author: defaultAuthor,
    category: "Mẹo & Xu hướng",
    readTime: "5 phút đọc",
    tags: ["mã qr mừng cưới", "hộp mừng cưới online", "mã qr thiệp cưới", "vietqr đám cưới"],
    toc: [
      { id: "ly-do-tich-hop-qr", title: "1. Vì sao nên tích hợp mã QR mừng cưới lên thiệp online?" },
      { id: "cach-tao-ma-vietqr", title: "2. Hướng dẫn tạo mã VietQR ngân hàng chính xác" },
      { id: "nghe-thuat-trinh-bay", title: "3. Nghệ thuật trình bày mã QR mừng cưới tinh tế, không phô trương" },
      { id: "tinh-nang-qr-uwedding", title: "4. Tính năng tạo mã QR tự động trên uWedding" },
    ],
    contentHtml: `
      <p class="lead">Tích hợp <strong>mã QR mừng cưới</strong> (hộp tiền mừng số) trên thiệp cưới online đang là xu hướng tiện ích được đông đảo khách mời yêu thích. Tuy nhiên, nếu không biết cách trình bày khéo léo, tính năng này có thể dễ bị hiểu lầm là thực dụng. Dưới đây là bí quyết giúp bạn làm điều đó thật tinh tế.</p>

      <h2 id="ly-do-tich-hop-qr">1. Vì sao nên tích hợp mã QR mừng cưới lên thiệp online?</h2>
      <p>Trong thực tế, luôn có những người bạn bè thân thiết, đồng nghiệp hoặc họ hàng ở xa, đi công tác hoặc vì lý do bất khả kháng không thể đến chung vui trực tiếp. Mã QR trên thiệp online giúp họ gửi gắm lời chúc phúc và món quà cưới ý nghĩa một cách nhanh chóng, bảo mật mà không cần phải nhắn tin xin số tài khoản riêng đầy ngại ngùng.</p>

      <h2 id="cach-tao-ma-vietqr">2. Hướng dẫn tạo mã VietQR ngân hàng chính xác</h2>
      <p>Để tạo mã QR ngân hàng chuẩn VietQR, bạn chỉ cần mở ứng dụng ngân hàng của mình (Vietcombank, MB Bank, Techcombank, ACB, VPBank...), vào mục "Mã QR nhận tiền" và lưu ảnh mã QR về máy. Khi khách quét mã này, ứng dụng ngân hàng sẽ tự động điền đúng tên chủ tài khoản và số tài khoản mà không sợ bị chuyển nhầm.</p>

      <h2 id="nghe-thuat-trinh-bay">3. Nghệ thuật trình bày mã QR mừng cưới tinh tế, không phô trương</h2>
      <p>Trên website thiệp cưới của uWedding, phần mừng cưới được thiết kế trang nhã dưới dạng một biểu tượng <strong>"Hộp Mừng Cưới"</strong> hoặc tab mở riêng kèm lời ngỏ dịu dàng:</p>
      <blockquote class="border-l-4 border-primary pl-4 italic my-4 text-gray-700">
        "Sự hiện diện của quý khách là món quà quý giá nhất dành cho chúng tôi. Nếu quý khách ở xa và muốn gửi gắm lời chúc mừng cùng món quà yêu thương, xin vui lòng quét mã tại đây. Vợ chồng chúng tôi xin chân thành cảm ơn!"
      </blockquote>

      <h2 id="tinh-nang-qr-uwedding">4. Tính năng tạo mã QR tự động trên uWedding</h2>
      <p>Khi sử dụng uWedding, bạn chỉ cần nhập số tài khoản, hệ thống sẽ tự động vẽ mã QR sắc nét, đồng bộ màu sắc với giao diện thiệp cưới, tạo nên sự chuyên nghiệp và sang trọng tuyệt đối.</p>
    `,
  },
  {
    id: "blog-6",
    slug: "thiep-cuoi-online-co-nhac-va-dinh-vi-ban-do",
    title: "Ưu Điểm Tuyệt Vời Của Thiệp Cưới Online Tích Hợp Bản Đồ Google Maps & Nhạc Nền",
    description:
      "Khám phá 2 tính năng cứu tinh giúp khách mời không bao giờ bị lạc đường và tạo cảm xúc ngọt ngào ngay khi mở thiệp cưới điện tử.",
    excerpt:
      "Tích hợp bản đồ chỉ đường thông minh và giai điệu tình yêu du dương - hai yếu tố tạo nên sự khác biệt vượt trội của thiệp cưới online thế hệ mới.",
    coverImage: "/image/wedding2.cuongvalan.click.png",
    publishedAt: "2026-02-15T08:00:00Z",
    updatedAt: "2026-10-25T08:00:00Z",
    author: defaultAuthor,
    category: "Mẹo & Xu hướng",
    readTime: "6 phút đọc",
    tags: ["thiệp cưới có nhạc", "thiệp cưới có bản đồ", "bản đồ đám cưới", "nhạc nền thiệp cưới"],
    toc: [
      { id: "ban-do-chi-duong", title: "1. Bản đồ chỉ đường Google Maps: Giải pháp chấm dứt cảnh khách bị lạc" },
      { id: "nhac-nen-tinh-yeu", title: "2. Âm nhạc: Chìa khóa khơi gợi cảm xúc người nhận thiệp" },
      { id: "chon-nhac-hay", title: "3. Gợi ý 10 bản tình ca cưới bất hủ làm nhạc nền thiệp online" },
    ],
    contentHtml: `
      <p class="lead">Đã bao giờ bạn nhận thiệp cưới giấy rồi phải loay hoay tìm kiếm tên nhà hàng, ngõ ngách vì bản đồ vẽ tay quá mờ nhạt? Hay mở một tấm thiệp mà không hề có chút cảm xúc âm nhạc nào? Đó là lý do vì sao <strong>thiệp cưới online có bản đồ và nhạc nền</strong> đang trở thành tiêu chuẩn mới.</p>

      <h2 id="ban-do-chi-duong">1. Bản đồ chỉ đường Google Maps: Giải pháp chấm dứt cảnh khách bị lạc</h2>
      <p>Khác hẳn với sơ đồ vẽ tay sơ sài trên thiệp giấy truyền thống thường khiến khách lạc đường hoặc đến trễ giờ làm lễ, tính năng bản đồ số trên thiệp cưới uWedding được nhúng trực tiếp API Google Maps chính xác:</p>
      <ul>
        <li>Khách chỉ cần chạm vào nút <em>"Chỉ đường đến tiệc cưới"</em>, ứng dụng Google Maps trên điện thoại sẽ tự động mở ra lộ trình ngắn nhất.</li>
        <li>Hỗ trợ cả địa chỉ nhà trai (Lễ Thành Hôn), nhà gái (Lễ Vu Quy) và Trung tâm hội nghị tiệc cưới.</li>
        <li>Có nút gọi điện khẩn cấp cho người đón khách nếu cần hỗ trợ.</li>
      </ul>

      <h2 id="nhac-nen-tinh-yeu">2. Âm nhạc: Chìa khóa khơi gợi cảm xúc người nhận thiệp</h2>
      <p>Khi khách bấm mở link thiệp cưới, một giai điệu acoustic lãng mạn nhẹ nhàng ngân vang sẽ ngay lập tức chạm đến trái tim người nghe. Âm nhạc tạo ra bầu không khí lễ hội ngập tràn hạnh phúc và khiến khách mời có cảm giác như đang trực tiếp tham dự một buổi tiệc ấm cúng.</p>

      <h2 id="chon-nhac-hay">3. Gợi ý 10 bản tình ca cưới bất hủ làm nhạc nền thiệp online</h2>
      <ul>
        <li><strong>Nhạc Việt:</strong> *Cưới Nhau Đi (Yes I Do), Ánh Nắng Của Anh, Cơn Mưa Tình Yêu, Một Nhà, Qua Đêm Nay.*</li>
        <li><strong>Nhạc Quốc Tế:</strong> *Until I Found You, Perfect (Ed Sheeran), A Thousand Years, Can't Take My Eyes Off You, Beautiful In White.*</li>
      </ul>
      <p>Trải nghiệm ngay tính năng âm nhạc và bản đồ tại các mẫu thiệp cưới nổi bật trên <a href="/vi/products">Kho giao diện uWedding</a>.</p>
    `,
  },
  {
    id: "blog-7",
    slug: "cach-gui-thiep-cuoi-online-lich-su-qua-zalo",
    title: "Cách Gửi Thiệp Cưới Online Qua Zalo, Messenger Đúng Chuẩn Không Lo Bị Đánh Giá",
    description:
      "Quy tắc vàng khi gửi thiệp cưới điện tử qua mạng xã hội: thời điểm gửi, cách xưng hô, gắn tên cá nhân và cách ứng xử để luôn ghi điểm thanh lịch.",
    excerpt:
      "Bí quyết gửi thiệp cưới online qua Zalo, Facebook Messenger vừa nhanh chóng, vừa lịch thiệp, giúp khách mời cảm nhận được trọn vẹn sự tôn trọng.",
    coverImage: "/image/weddingmobile4.png",
    publishedAt: "2026-02-20T08:00:00Z",
    updatedAt: "2026-10-25T08:00:00Z",
    author: defaultAuthor,
    category: "Cẩm nang cưới",
    readTime: "7 phút đọc",
    tags: ["gửi thiệp cưới qua zalo", "phép lịch sự khi mời cưới", "cách mời cưới khéo", "văn hóa mời cưới"],
    toc: [
      { id: "thoi-diem-vang", title: "1. Thời điểm vàng để gửi thiệp cưới online" },
      { id: "quy-tac-3-khong", title: "2. Quy tắc '3 KHÔNG' khi gửi thiệp cưới qua Zalo" },
      { id: "ca-nhan-hoa", title: "3. Sức mạnh của việc cá nhân hóa từng tấm thiệp" },
      { id: "nhac-nho-kheo", title: "4. Cách nhắc lịch tiệc cưới khéo léo trước ngày cưới 2 ngày" },
    ],
    contentHtml: `
      <p class="lead">Gửi thiệp cưới online tuy tiện lợi nhưng nếu không khéo léo sẽ rất dễ bị hiểu lầm là thiếu nhiệt tình. Dưới đây là những quy tắc ứng xử văn minh được các chuyên gia cưới hỏi đúc kết.</p>

      <h2 id="thoi-diem-vang">1. Thời điểm vàng để gửi thiệp cưới online</h2>
      <p>Thời điểm hoàn hảo nhất để gửi thiệp cưới online là <strong>từ 2 đến 3 tuần trước ngày hôn lễ</strong>. Nếu gửi quá sớm (trước 2 tháng), khách rất dễ quên lịch. Nếu gửi quá sát ngày (dưới 5 ngày), khách sẽ cảm thấy mình là phương án phụ hoặc không kịp sắp xếp công việc.</p>

      <h2 id="quy-tac-3-khong">2. Quy tắc '3 KHÔNG' khi gửi thiệp cưới qua Zalo</h2>
      <ol>
        <li><strong>Không gửi vào nhóm chat chung (Group Chat):</strong> Hãy gửi tin nhắn riêng cho từng người (Direct Message). Mời chung trong nhóm khiến khách cảm thấy không được coi trọng.</li>
        <li><strong>Không gửi link cụt lủn:</strong> Luôn đính kèm lời chào hỏi thăm và lý do gửi thiệp online.</li>
        <li><strong>Không quên gọi điện cho người thân lớn tuổi:</strong> Với họ hàng, cô chú, một cuộc gọi trước khi gửi link là bắt buộc.</li>
      </ol>

      <h2 id="ca-nhan-hoa">3. Sức mạnh của việc cá nhân hóa từng tấm thiệp</h2>
      <p>Thay vì gửi một đường link chung cho tất cả mọi người, hãy dùng công cụ <a href="/vi/create-name-invitation">Tạo thiệp gắn tên khách uWedding</a> để khi khách mở ra, ngay trên đầu thiệp sẽ hiện to rõ: <em>"Trân trọng kính mời Anh Hoàng & Bạn Gái"</em>. Điều này chứng minh bạn đã dành thời gian chăm chút riêng cho họ.</p>

      <h2 id="nhac-nho-kheo">4. Cách nhắc lịch tiệc cưới khéo léo trước ngày cưới 2 ngày</h2>
      <p>Trước ngày cưới 48 tiếng, bạn có thể đăng một bức ảnh pre-wedding nhẹ nhàng lên Story Zalo/Facebook kèm dòng đếm ngược: <em>"Hẹn gặp lại mọi người thân yêu vào tối thứ 7 tuần này nhé!"</em>. Đây là cách nhắc lịch tự nhiên, dễ thương mà không hề mang tính hối thúc.</p>
    `,
  },
  {
    id: "blog-8",
    slug: "tinh-nang-rsvp-xac-nhan-tham-du-thiep-cuoi",
    title: "Tính Năng RSVP (Xác Nhận Tham Dự) Là Gì? Bí Quyết Giúp Bạn Không Lo Bị Thừa Bàn Tiệc",
    description:
      "Tìm hiểu RSVP là gì và cách ứng dụng tính năng xác nhận tham dự trên thiệp cưới online để tối ưu số lượng bàn tiệc, tiết kiệm hàng chục triệu đồng tiền cỗ.",
    excerpt:
      "Khám phá vũ khí bí mật giúp các cặp đôi giải quyết bài toán đau đầu muôn thuở: Ước lượng chính xác số lượng khách mời để không bị thừa hoặc thiếu cỗ cưới.",
    coverImage: "/image/wedding3.cuongvalan.click.png",
    publishedAt: "2026-03-01T08:00:00Z",
    updatedAt: "2026-10-25T08:00:00Z",
    author: defaultAuthor,
    category: "Cẩm nang cưới",
    readTime: "6 phút đọc",
    tags: ["rsvp là gì", "xác nhận tham dự đám cưới", "tính năng rsvp", "kinh nghiệm đặt tiệc cưới"],
    toc: [
      { id: "rsvp-la-gi", title: "1. Khái niệm RSVP trong văn hóa thiệp cưới" },
      { id: "tai-sao-can-rsvp", title: "2. Tại sao mọi đám cưới thời nay đều cần tính năng RSVP?" },
      { id: "cach-hoat-dong", title: "3. Cách thức hoạt động của RSVP trên thiệp online uWedding" },
      { id: "loi-ich-kinh-te", title: "4. Bài toán kinh tế: Tiết kiệm hàng chục triệu đồng tiền cỗ thừa" },
    ],
    contentHtml: `
      <p class="lead">Nỗi ám ảnh lớn nhất của mọi gia đình trong ngày cưới là: <em>"Báo 50 mâm mà chỉ có 35 mâm đến ngồi, thừa 15 mâm cỗ đắt đỏ!"</em> hoặc ngược lại <em>"Khách đi quá đông dẫn đến thiếu chỗ ngồi bối rối!"</em>. Tính năng <strong>RSVP trên thiệp cưới online</strong> chính là lời giải hoàn hảo nhất.</p>

      <h2 id="rsvp-la-gi">1. Khái niệm RSVP trong văn hóa thiệp cưới</h2>
      <p>RSVP là viết tắt của cụm từ tiếng Pháp <em>"Répondez s'il vous plaît"</em>, có nghĩa là <em>"Xin vui lòng hồi âm / phản hồi"</em>. Đây là một nghi thức lịch sự phổ biến toàn cầu, yêu cầu khách mời xác nhận xem họ có thể tham dự buổi tiệc hay không và đi cùng bao nhiêu người.</p>

      <h2 id="tai-sao-can-rsvp">2. Tại sao mọi đám cưới thời nay đều cần tính năng RSVP?</h2>
      <p>Với thiệp giấy truyền thống, hầu như không ai gọi điện lại để báo có đi hay không. Nhưng với thiệp cưới online, chỉ với 1 cú click chạm trên màn hình điện thoại, khách mời có thể chọn:</p>
      <ul>
        <li>✅ <strong>Chắc chắn tham dự:</strong> Đi 1 mình hoặc Đi cùng gia đình/người yêu (chọn số người).</li>
        <li>❌ <strong>Rất tiếc không thể tham dự:</strong> Kèm theo ô gửi lời chúc mừng chân thành đến đôi uyên ương.</li>
      </ul>

      <h2 id="cach-hoat-dong">3. Cách thức hoạt động của RSVP trên thiệp online uWedding</h2>
      <p>Ngay khi khách bấm gửi phản hồi trên thiệp, dữ liệu sẽ được lưu tự động theo thời gian thực. Cô dâu chú rể chỉ cần mở bảng thống kê là biết chính xác: có bao nhiêu người đi, bao nhiêu người vắng, giúp tổng hợp danh sách khách mời trong vòng 1 nốt nhạc.</p>

      <h2 id="loi-ich-kinh-te">4. Bài toán kinh tế: Tiết kiệm hàng chục triệu đồng tiền cỗ thừa</h2>
      <p>Mỗi mâm cỗ cưới tại nhà hàng hiện nay dao động từ 3.000.000đ đến 7.000.000đ. Nhờ có danh sách RSVP chuẩn xác trước ngày cưới 5 ngày, bạn có thể chốt số lượng bàn tiệc thực tế với nhà hàng, tránh tình trạng đặt dư thừa gây lãng phí hàng chục triệu đồng.</p>
    `,
  },
  {
    id: "blog-9",
    slug: "so-sanh-chi-phi-thiep-cuoi-online-va-thiep-giay",
    title: "So Sánh Chi Phí Thiệp Cưới Online Và Thiệp Giấy: Tiết Kiệm Đến 80% Ngân Sách",
    description:
      "Bảng phân tích chi tiết chi phí in ấn thiệp giấy so với làm thiệp cưới online. Giúp các cặp đôi có kế hoạch tài chính đám cưới thông minh và tối ưu nhất.",
    excerpt:
      "Phân tích tài chính chi tiết: Tại sao chuyển đổi sang thiệp cưới online giúp các cặp đôi tiết kiệm từ 5 - 10 triệu đồng để dành cho chuyến trăng mật trong mơ.",
    coverImage: "/image/weddingmobile5.png",
    publishedAt: "2026-03-05T08:00:00Z",
    updatedAt: "2026-10-25T08:00:00Z",
    author: defaultAuthor,
    category: "Cẩm nang cưới",
    readTime: "6 phút đọc",
    tags: ["chi phí làm thiệp cưới", "giá thiệp cưới online", "tiết kiệm chi phí đám cưới", "bảng giá thiệp cưới"],
    toc: [
      { id: "bang-so-sanh-chi-phi", title: "1. Bảng so sánh chi phí thực tế giữa thiệp giấy và thiệp online" },
      { id: "chi-phi-an-thiep-giay", title: "2. Những chi phí ẩn khi làm thiệp giấy truyền thống" },
      { id: "loi-ich-kinh-te-thiep-online", title: "3. Lợi ích tài chính vượt trội của thiệp cưới điện tử" },
      { id: "bang-gia-uwedding", title: "4. Bảng giá dịch vụ thiệp cưới online tại uWedding" },
    ],
    contentHtml: `
      <p class="lead">Chi phí tổ chức đám cưới luôn là bài toán đau đầu với các bạn trẻ. Cắt giảm những khoản chi không cần thiết để đầu tư cho những kỷ niệm lâu dài là xu hướng tiêu dùng thông minh. Hãy cùng so sánh chi phí thực tế giữa hai hình thức thiệp cưới.</p>

      <h2 id="bang-so-sanh-chi-phi">1. Bảng so sánh chi phí thực tế giữa thiệp giấy và thiệp online</h2>
      <div class="overflow-x-auto my-4">
        <table class="w-full border-collapse border border-gray-200 text-sm">
          <thead>
            <tr class="bg-gray-100">
              <th class="border border-gray-200 p-2 text-left">Hạng mục so sánh</th>
              <th class="border border-gray-200 p-2 text-left">Thiệp Giấy (500 khách)</th>
              <th class="border border-gray-200 p-2 text-left">Thiệp Cưới Online uWedding</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-200 p-2 font-medium">Chi phí thiết kế & phôi thiệp</td>
              <td class="border border-gray-200 p-2">3.500.000đ – 7.500.000đ (7.000 - 15.000đ/thiệp)</td>
              <td class="border border-gray-200 p-2 text-primary font-bold">199.000đ – 399.000đ (Trọn gói)</td>
            </tr>
            <tr>
              <td class="border border-gray-200 p-2 font-medium">Chi phí phát sinh khi in thêm</td>
              <td class="border border-gray-200 p-2">Đắt đỏ (In số lượng ít giá rất cao)</td>
              <td class="border border-gray-200 p-2 text-primary">0đ (Không giới hạn lượt gửi)</td>
            </tr>
            <tr>
              <td class="border border-gray-200 p-2 font-medium">Chi phí gửi bưu điện / xe khách</td>
              <td class="border border-gray-200 p-2">500.000đ – 1.000.000đ</td>
              <td class="border border-gray-200 p-2 text-primary">0đ (Gửi qua Zalo, Messenger tức thì)</td>
            </tr>
            <tr>
              <td class="border border-gray-200 p-2 font-medium">Thời gian & công sức đi phát thiệp</td>
              <td class="border border-gray-200 p-2">Mất từ 1 đến 2 tuần chạy xe nắng mưa</td>
              <td class="border border-gray-200 p-2 text-primary">Chỉ mất 15 phút gửi online</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="chi-phi-an-thiep-giay">2. Những chi phí ẩn khi làm thiệp giấy truyền thống</h2>
      <p>Nhiều cặp đôi không lường trước chi phí xăng xe, thời gian nghỉ làm để đi trao thiệp trực tiếp, chi phí chuyển phát nhanh cho khách ở xa, và đặc biệt là chi phí in lại khi chẳng may sai thông tin địa chỉ nhà hàng.</p>

      <h2 id="loi-ich-kinh-te-thiep-online">3. Lợi ích tài chính vượt trội của thiệp cưới điện tử</h2>
      <p>Chỉ với khoản đầu tư chưa tới 400.000đ, bạn đã sở hữu một website cưới vĩnh viễn với đầy đủ tính năng cao cấp. Khoản tiền tiết kiệm 5 - 8 triệu đồng có thể dùng để nâng cấp chất lượng thực đơn bàn tiệc hoặc bổ sung vào quỹ du lịch trăng mật.</p>

      <h2 id="bang-gia-uwedding">4. Bảng giá dịch vụ thiệp cưới online tại uWedding</h2>
      <p>Xem chi tiết bảng giá các gói Basic, Pro và Premium tại <a href="/vi/price">Bảng giá thiệp cưới online uWedding</a>.</p>
    `,
  },
  {
    id: "blog-10",
    slug: "thiep-cuoi-online-gan-ten-khach-moi-ca-nhan-hoa",
    title: "Hướng Dẫn Tạo Link Thiệp Cưới Gắn Tên Riêng Từng Khách Mời Cá Nhân Hóa",
    description:
      "Cách tạo link thiệp cưới điện tử tự động điền tên từng vị khách mời chỉ trong vài giây. Giải pháp cá nhân hóa lời mời trang trọng, lịch sự nhất.",
    excerpt:
      "Tạo dấu ấn đặc biệt cho từng người nhận thiệp với công cụ tự động hóa gắn tên khách mời riêng biệt vào đường link thiệp cưới của uWedding.",
    coverImage: "/image/weddingmobile6.png",
    publishedAt: "2026-03-10T08:00:00Z",
    updatedAt: "2026-10-25T08:00:00Z",
    author: defaultAuthor,
    category: "Mẹo & Xu hướng",
    readTime: "5 phút đọc",
    tags: ["thiệp cưới gắn tên khách", "cá nhân hóa thiệp cưới", "tạo link thiệp có tên", "công cụ tạo thiệp cưới"],
    toc: [
      { id: "tai-sao-can-gan-ten", title: "1. Tại sao nên gửi thiệp cưới có gắn tên khách mời?" },
      { id: "huong-dan-cong-cu", title: "2. Hướng dẫn sử dụng công cụ tạo tên khách mời của uWedding" },
      { id: "vi-du-thuc-te", title: "3. Ví dụ thực tế các cách xưng hô chuẩn mực" },
    ],
    contentHtml: `
      <p class="lead">Gửi một đường link thiệp cưới chung chung có thể khiến khách mời cảm giác như nhận một thông báo hàng loạt. Nhưng nếu mở link ra và thấy ngay dòng chữ: <em>"Trân trọng kính mời Anh Tuấn & Chị Lan"</em>, người nhận sẽ cảm thấy vô cùng được tôn trọng.</p>

      <h2 id="tai-sao-can-gan-ten">1. Tại sao nên gửi thiệp cưới có gắn tên khách mời?</h2>
      <p>Cá nhân hóa là bí quyết số 1 trong giao tiếp hiện đại. Tên riêng của mỗi người là âm thanh ngọt ngào nhất. Khi thiệp cưới hiển thị đúng danh xưng và tên của họ:</p>
      <ul>
        <li>Tăng tỷ lệ khách mở xem thiệp cưới lên đến 95%.</li>
        <li>Thể hiện sự chu đáo, tỉ mỉ và tôn trọng tối đa của gia đình cô dâu chú rể.</li>
        <li>Tránh việc khách mời thắc mắc thiệp này mời cá nhân hay mời cả gia đình.</li>
      </ul>

      <h2 id="huong-dan-cong-cu">2. Hướng dẫn sử dụng công cụ tạo tên khách mời của uWedding</h2>
      <p>Bạn không cần phải tạo hàng trăm trang web khác nhau! uWedding đã tích hợp sẵn công cụ tạo link thông minh hoàn toàn tự động:</p>
      <ol>
        <li>Truy cập vào trang <a href="/vi/create-name-invitation">Công cụ tạo tên khách mời uWedding</a>.</li>
        <li>Dán đường link thiệp cưới chính của bạn vào ô <em>Link thiệp cưới</em>.</li>
        <li>Gõ tên vị khách bạn muốn mời (Ví dụ: <em>Kính mời Gia đình Bác Năm, Kính mời Bạn Hoàng Anh...</em>).</li>
        <li>Bấm <strong>Tạo link thiệp</strong> > Bấm <strong>Copy</strong> để gửi qua Zalo/Facebook.</li>
      </ol>

      <h2 id="vi-du-thuc-te">3. Ví dụ thực tế các cách xưng hô chuẩn mực</h2>
      <ul>
        <li>Với bạn thân: <em>"Thân mời Cậu & Người Thương"</em>.</li>
        <li>Với sếp/đối tác: <em>"Kính mời Anh/Chị [Tên] và Gia Đình"</em>.</li>
        <li>Với bạn đại học/đồng nghiệp: <em>"Mời Bạn [Tên]"</em>.</li>
      </ul>
    `,
  },
  {
    id: "blog-11",
    slug: "mau-thiep-cuoi-online-phong-cach-toi-gian-minimalism",
    title: "Top Mẫu Thiệp Cưới Online Phong Cách Tối Giản (Minimalism) Tinh Tế Cho Giới Trẻ",
    description:
      "Khám phá các mẫu thiệp cưới điện tử phong cách Minimalism tối giản: ít chi tiết rườm rà, tập trung typography thanh lịch và cảm xúc chân thật.",
    excerpt:
      "Ít hơn là nhiều hơn (Less is more) - Khám phá sức hút bất tận của phong cách thiệp cưới online tối giản đang làm mưa làm gió trong cộng đồng cưới trẻ.",
    coverImage: "/image/wedding4.cuongvalan.click.png",
    publishedAt: "2026-03-15T08:00:00Z",
    updatedAt: "2026-10-25T08:00:00Z",
    author: defaultAuthor,
    category: "Mẫu thiệp cưới",
    readTime: "6 phút đọc",
    tags: ["thiệp cưới tối giản", "thiệp cưới minimalism", "mẫu thiệp cưới đơn giản sang trọng", "thiết kế thiệp cưới"],
    toc: [
      { id: "dac-trung-minimalism", title: "1. Đặc trưng của thiệp cưới online phong cách tối giản" },
      { id: "ai-nen-chon", title: "2. Phong cách này phù hợp với những cặp đôi nào?" },
      { id: "top-mau-minimalism-uwedding", title: "3. Các mẫu thiệp cưới Minimalism đẹp nhất tại uWedding" },
    ],
    contentHtml: `
      <p class="lead">Không hoa lá màu mè, không họa tiết rườm rà, phong cách <strong>Minimalism (Tối giản)</strong> chinh phục người xem bằng sự tinh tế, khoảng trắng khoáng đạt và nghệ thuật sắp đặt chữ nghệ thuật (Typography) đỉnh cao.</p>

      <h2 id="dac-trung-minimalism">1. Đặc trưng của thiệp cưới online phong cách tối giản</h2>
      <ul>
        <li><strong>Bảng màu trung tính:</strong> Ưu tiên các tone màu tự nhiên như trắng ngọc trai, be cát, xám nhạt hoặc màu nude ấm áp.</li>
        <li><strong>Khoảng thở thị giác (Whitespace):</strong> Không gian rộng rãi giúp mắt người đọc tập trung hoàn toàn vào nụ cười hạnh phúc của đôi bạn và thông tin ngày cưới.</li>
        <li><strong>Font chữ Serif & Calligraphy hiện đại:</strong> Sự phối hợp hài hòa giữa nét chữ thanh thoát và phong thái hiện đại, tạo nên vẻ đẹp vượt thời gian (timeless).</li>
      </ul>

      <h2 id="ai-nen-chon">2. Phong cách này phù hợp với những cặp đôi nào?</h2>
      <p>Phong cách Minimalism cực kỳ lý tưởng cho những cặp đôi tổ chức tiệc cưới thân mật (Intimate Wedding), tiệc cưới sân vườn, tiệc ngoài trời hoặc các cặp đôi yêu thích lối sống tối giản, văn minh và hiện đại.</p>

      <h2 id="top-mau-minimalism-uwedding">3. Các mẫu thiệp cưới Minimalism đẹp nhất tại uWedding</h2>
      <p>Bạn có thể trải nghiệm ngay các mẫu thuộc bộ sưu tập <strong>Classic & Minimal</strong> tại danh mục sản phẩm của chúng tôi để chọn ra thiết kế ưng ý nhất.</p>
    `,
  },
  {
    id: "blog-12",
    slug: "mau-thiep-cuoi-online-phong-cach-han-quoc",
    title: "10+ Mẫu Thiệp Cưới Online Phong Cách Hàn Quốc Lãng Mạn & Ngọt Ngào Nhất",
    description:
      "Tổng hợp các mẫu thiệp cưới điện tử mang đậm phong cách Hàn Quốc dịu dàng, thơ mộng với gam màu pastel và hiệu ứng chuyển động nhẹ nhàng.",
    excerpt:
      "Mang hơi thở thanh xuân lãng mạn như phim truyền hình K-Drama vào ngày trọng đại của bạn với bộ sưu tập thiệp cưới online phong cách Hàn Quốc.",
    coverImage: "/image/weddingmobile7.png",
    publishedAt: "2026-03-20T08:00:00Z",
    updatedAt: "2026-10-25T08:00:00Z",
    author: defaultAuthor,
    category: "Mẫu thiệp cưới",
    readTime: "6 phút đọc",
    tags: ["thiệp cưới hàn quốc", "mẫu thiệp cưới ngọt ngào", "thiệp cưới phong cách k-drama", "thiệp cưới lãng mạn"],
    toc: [
      { id: "suc-hut-phong-cach-han-quoc", title: "1. Sức hút khó cưỡng của phong cách thiệp cưới Hàn Quốc" },
      { id: "diem-nhan-thiet-ke", title: "2. Điểm nhấn thiết kế: Gam màu pastel và câu chuyện tình yêu" },
      { id: "trai-nghiem-thuc-te", title: "3. Xem trước các mẫu thiệp cưới Hàn Quốc tại uWedding" },
    ],
    contentHtml: `
      <p class="lead">Nếu bạn từng mê đắm những khung cảnh đám cưới ngoài trời thơ mộng trong các bộ phim truyền hình Hàn Quốc, thì những mẫu thiệp cưới mang phong cách <strong>Korean Romantic</strong> chính là sự lựa chọn không thể bỏ qua.</p>

      <h2 id="suc-hut-phong-cach-han-quoc">1. Sức hút khó cưỡng của phong cách thiệp cưới Hàn Quốc</h2>
      <p>Thiết kế Hàn Quốc luôn biết cách tạo cảm xúc rung động ngay từ cái nhìn đầu tiên nhờ sự mềm mại, nữ tính và tràn ngập tình cảm ấm áp. Từng khung hình, từng dòng chữ đều kể lại hành trình từ lúc hai bạn quen nhau, yêu nhau cho đến ngày về chung một nhà.</p>

      <h2 id="diem-nhan-thiet-ke">2. Điểm nhấn thiết kế: Gam màu pastel và câu chuyện tình yêu</h2>
      <ul>
        <li><strong>Tone màu dịu nhẹ:</strong> Màu hoa anh đào (Baby Pink), tím mộng mơ (Lavender), xanh bơ (Sage Green).</li>
        <li><strong>Dòng thời gian tình yêu (Love Timeline):</strong> Một mục nhỏ ghi dấu những cột mốc: <em>Ngày đầu gặp gỡ - Lời tỏ tình đầu tiên - Ngày cầu hôn - Ngày chung đôi</em>.</li>
        <li><strong>Hiệu ứng hoa bay nhẹ nhàng:</strong> Cánh hoa đào rơi lãng mạn khi cuộn trang tạo cảm giác như đang bước vào lễ đường thần tiên.</li>
      </ul>

      <h2 id="trai-nghiem-thuc-te">3. Xem trước các mẫu thiệp cưới Hàn Quốc tại uWedding</h2>
      <p>Xem trước và tùy chỉnh thông tin cho mẫu thiệp cưới Hàn Quốc của bạn ngay tại <a href="/vi/products">Kho mẫu thiệp cưới uWedding</a>.</p>
    `,
  },
  {
    id: "blog-13",
    slug: "kinh-nghiem-chuan-bi-anh-va-thong-tin-lam-thiep-cuoi",
    title: "Cần Chuẩn Bị Những Gì Trước Khi Làm Thiệp Cưới Online? Checklist Đầy Đủ",
    description:
      "Checklist 7 bước chuẩn bị thông tin, hình ảnh và âm nhạc giúp bạn đặt làm thiệp cưới online nhanh chóng, hoàn thiện trong 1 lần duy nhất.",
    excerpt:
      "Bảng kiểm tra (Checklist) chi tiết giúp cô dâu chú rể chuẩn bị đầy đủ mọi dữ liệu cần thiết trước khi đặt làm website thiệp cưới online.",
    coverImage: "/image/weddingmobile8.png",
    publishedAt: "2026-03-25T08:00:00Z",
    updatedAt: "2026-10-25T08:00:00Z",
    author: defaultAuthor,
    category: "Cẩm nang cưới",
    readTime: "7 phút đọc",
    tags: ["kinh nghiệm làm thiệp cưới", "checklist chuẩn bị đám cưới", "thông tin thiệp cưới", "chuẩn bị ảnh cưới"],
    toc: [
      { id: "checklist-thong-tin", title: "1. Bảng danh sách thông tin cưới cần xác nhận" },
      { id: "chuan-bi-hinh-anh", title: "2. Tiêu chuẩn chọn ảnh cưới đưa lên thiệp online" },
      { id: "chon-thoi-diem-dat", title: "3. Nên đặt làm thiệp cưới trước ngày cưới bao lâu?" },
    ],
    contentHtml: `
      <p class="lead">Chuẩn bị kỹ lưỡng thông tin từ trước sẽ giúp bạn chỉ mất đúng 5 phút để hoàn tất việc đặt làm thiệp cưới online mà không phải chỉnh sửa nhiều lần. Dưới đây là Checklist chi tiết dành cho bạn.</p>

      <h2 id="checklist-thong-tin">1. Bảng danh sách thông tin cưới cần xác nhận</h2>
      <ul>
        <li>Họ tên chính xác của Cô dâu & Chú rể (kèm tên thường gọi nếu muốn).</li>
        <li>Họ tên Bố Mẹ hai bên gia đình (chú ý phân biệt rạch ròi thứ tự Bố Mẹ nhà trai, nhà gái).</li>
        <li>Ngày Dương lịch và ngày Âm lịch của từng buổi lễ (Lễ Vu Quy, Lễ Tân Hôn, Tiệc Cưới).</li>
        <li>Địa chỉ chính xác của nhà hàng hoặc tư gia (kèm link ghim Google Maps nếu có).</li>
      </ul>

      <h2 id="chuan-bi-hinh-anh">2. Tiêu chuẩn chọn ảnh cưới đưa lên thiệp online</h2>
      <p>Nên chọn từ 8 đến 15 ảnh cưới từ file gốc của studio chụp ảnh. Chọn đa dạng các góc chụp: ảnh chân dung hai người mỉm cười rạng rỡ, ảnh góc rộng ngoại cảnh, ảnh cận cảnh nhẫn cưới hoặc nụ hôn ngọt ngào để album ảnh trực tuyến phong phú và cuốn hút.</p>

      <h2 id="chon-thoi-diem-dat">3. Nên đặt làm thiệp cưới trước ngày cưới bao lâu?</h2>
      <p>Khoảng thời gian lý tưởng nhất là <strong>trước ngày cưới từ 3 đến 4 tuần</strong>. Khi đó bạn đã có đầy đủ ảnh cưới hoàn thiện từ studio và có đủ thời gian gửi thiệp thong thả tới mọi khách mời.</p>
    `,
  },
  {
    id: "blog-14",
    slug: "thiep-cuoi-online-chu-ky-so-va-hieu-ung-3d",
    title: "Xu Hướng Thiệp Cưới Online Chữ Ký Số & Hiệu Ứng 3D Độc Đáo Cho Đám Cưới Gen Z",
    description:
      "Trải nghiệm thiệp cưới công nghệ tương tác đỉnh cao với chữ ký điện tử trực tiếp và hiệu ứng 3D sống động, khẳng định dấu ấn cá nhân của cặp đôi.",
    excerpt:
      "Đột phá công nghệ cưới: Khám phá cách các cặp đôi Gen Z tạo nên sự trầm trồ cho khách mời bằng thiệp cưới tương tác chữ ký số và mô hình 3D.",
    coverImage: "/image/wedding5.cuongvalan.click.png",
    publishedAt: "2026-04-01T08:00:00Z",
    updatedAt: "2026-10-25T08:00:00Z",
    author: defaultAuthor,
    category: "Mẹo & Xu hướng",
    readTime: "6 phút đọc",
    tags: ["thiệp cưới chữ ký số", "thiệp cưới 3d", "công nghệ cưới gen z", "thiệp cưới tương tác"],
    toc: [
      { id: "chu-ky-so-la-gi", title: "1. Thiệp cưới chữ ký số là gì?" },
      { id: "hieu-ung-3d", title: "2. Hiệu ứng mô hình 3D sống động" },
      { id: "tai-sao-gen-z-thich", title: "3. Vì sao thế hệ trẻ cực kỳ ưa chuộng dòng thiệp này?" },
    ],
    contentHtml: `
      <p class="lead">Đám cưới của thế hệ trẻ ngày nay không chỉ là nghi thức, mà là một bữa tiệc của sự sáng tạo và phong cách sống. Những mẫu <strong>thiệp cưới chữ ký số & 3D</strong> tại uWedding đang tạo nên cơn sốt nhờ trải nghiệm tương tác chưa từng có.</p>

      <h2 id="chu-ky-so-la-gi">1. Thiệp cưới chữ ký số là gì?</h2>
      <p>Khách mời khi mở thiệp có thể dùng ngón tay hoặc chuột để trực tiếp ký tên, vẽ trái tim và viết lời chúc mừng nắn nót lên màn hình thiệp cưới. Chữ ký và lời chúc này sẽ được lưu giữ vĩnh viễn trên trang web như một cuốn sổ lưu bút kỹ thuật số vô giá.</p>

      <h2 id="hieu-ung-3d">2. Hiệu ứng mô hình 3D sống động</h2>
      <p>Ứng dụng công nghệ đồ họa WebGL hiện đại, khách mời có thể xoay 360 độ ngắm nhìn chiếc nhẫn cưới kim cương lấp lánh hoặc tượng thần tình yêu Cupid sống động ngay trên trình duyệt mà không cần cài đặt bất kỳ phần mềm nào.</p>

      <h2 id="tai-sao-gen-z-thich">3. Vì sao thế hệ trẻ cực kỳ ưa chuộng dòng thiệp này?</h2>
      <p>Nó mang lại cảm giác mới lạ, hiện đại và khác biệt hoàn toàn so với những mẫu thiệp tĩnh nhàm chán trước đây, khiến bất cứ vị khách nào nhận được thiệp cũng phải trầm trồ khen ngợi sự đầu tư của bạn.</p>
    `,
  },
  {
    id: "blog-15",
    slug: "nhung-sai-lam-can-tranh-khi-lam-thiep-cuoi-online",
    title: "7 Sai Lầm Phổ Biến Khi Tự Làm Thiệp Cưới Online Khiến Khách Mời Khó Chịu",
    description:
      "Tổng hợp 7 lỗi sai ngớ ngẩn khi làm thiệp cưới trực tuyến khiến khách mời khó chịu: nhạc quá to, chữ khó đọc, ảnh mờ, link hỏng và cách khắc phục.",
    excerpt:
      "Tránh ngay 7 lỗi thiết kế và gửi thiệp cưới online tai hại này để đám cưới của bạn luôn hoàn hảo, chỉn chu và nhận được trọn vẹn lời khen ngợi.",
    coverImage: "/image/weddingmobile9.png",
    publishedAt: "2026-04-05T08:00:00Z",
    updatedAt: "2026-10-25T08:00:00Z",
    author: defaultAuthor,
    category: "Cẩm nang cưới",
    readTime: "7 phút đọc",
    tags: ["sai lầm khi làm thiệp cưới", "lưu ý làm thiệp cưới online", "kinh nghiệm gửi thiệp cưới", "mẹo cưới hỏi"],
    toc: [
      { id: "sai-lam-1", title: "1. Sai lầm 1: Nhạc nền tự động mở âm lượng quá lớn" },
      { id: "sai-lam-2", title: "2. Sai lầm 2: Chọn font chữ uốn lượn quá đà gây khó đọc" },
      { id: "sai-lam-3", title: "3. Sai lầm 3: Đưa ảnh cưới dung lượng quá nặng làm đơ máy" },
      { id: "sai-lam-4", title: "4. Sai lầm 4: Sai sót thông tin ngày giờ, địa điểm" },
      { id: "sai-lam-5", title: "5. Sai lầm 5: Link bị lỗi hoặc hết hạn xem" },
      { id: "giai-phap-uwedding", title: "6. uWedding kiểm duyệt kỹ thuật giúp bạn an tâm tuyệt đối" },
    ],
    contentHtml: `
      <p class="lead">Thiệp cưới online rất tiện lợi nhưng nếu thiếu sự chỉn chu, một vài lỗi nhỏ cũng có thể khiến trải nghiệm của khách mời trở nên khó chịu. Hãy kiểm tra ngay 7 lỗi sau trước khi bấm gửi thiệp nhé!</p>

      <h2 id="sai-lam-1">1. Sai lầm 1: Nhạc nền tự động mở âm lượng quá lớn</h2>
      <p>Nhiều khách mời mở thiệp khi đang ở nơi làm việc, trên xe buýt hoặc trong cuộc họp. Nếu nhạc nền tự động phát với âm lượng tối đa sẽ gây giật mình và khó chịu. Luôn có nút bật/tắt âm thanh rõ ràng và đặt mức âm lượng mặc định êm dịu.</p>

      <h2 id="sai-lam-2">2. Sai lầm 2: Chọn font chữ uốn lượn quá đà gây khó đọc</h2>
      <p>Font chữ uốn lượn Calligraphy chỉ nên dùng cho tên cô dâu chú rể. Các thông tin quan trọng như ngày giờ, địa điểm, số điện thoại phải dùng font chữ rõ ràng, dễ đọc cho cả người lớn tuổi.</p>

      <h2 id="sai-lam-3">3. Sai lầm 3: Đưa ảnh cưới dung lượng quá nặng làm đơ máy</h2>
      <p>Tải ảnh gốc 10MB - 20MB lên web sẽ khiến khách dùng mạng 4G chờ cả phút mới tải xong trang. Ảnh cưới cần được nén định dạng WebP hiện đại để vừa giữ độ nét căng vừa tải trong 0.5 giây.</p>

      <h2 id="sai-lam-4">4. Sai lầm 4: Sai sót thông tin ngày giờ, địa điểm</h2>
      <p>Hãy nhờ ít nhất 3 người thân đọc và kiểm tra lại toàn bộ thông tin ngày Dương lịch, ngày Âm lịch, thứ trong tuần và địa chỉ tiệc cưới trước khi bấm gửi thiệp.</p>

      <h2 id="sai-lam-5">5. Sai lầm 5: Link bị lỗi hoặc hết hạn xem</h2>
      <p>Nhiều công cụ tạo web tự do hết hạn hosting chỉ sau vài tuần. Hãy lựa chọn các nền tảng uy tín như uWedding để đảm bảo đường link thiệp cưới luôn hoạt động ổn định 24/7.</p>

      <h2 id="giai-phap-uwedding">6. uWedding kiểm duyệt kỹ thuật giúp bạn an tâm tuyệt đối</h2>
      <p>Tại uWedding, mọi thiệp cưới đều được đội ngũ kỹ thuật rà soát kỹ lưỡng về tốc độ tải, tính tương thích trên mọi điện thoại trước khi bàn giao cho bạn.</p>
    `,
  },
];

export const blogCategories: BlogCategory[] = [
  "Cẩm nang cưới",
  "Mẫu thiệp cưới",
  "Mẹo & Xu hướng",
  "Lời chúc & Thiệp mời",
];

export function getAllBlogSlugs(): string[] {
  return blogs.map((blog) => blog.slug);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogs.find((blog) => blog.slug === slug);
}

export function getRelatedPosts(currentSlug: string, category: BlogCategory, limit = 3): BlogPost[] {
  const sameCategory = blogs.filter(
    (blog) => blog.slug !== currentSlug && blog.category === category
  );
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  const otherPosts = blogs.filter(
    (blog) => blog.slug !== currentSlug && blog.category !== category
  );
  return [...sameCategory, ...otherPosts].slice(0, limit);
}

