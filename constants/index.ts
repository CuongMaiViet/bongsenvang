export const headerLinks = [
  {
    label: "Trang chủ",
    route: "/",
  },
  {
    label: "Giới thiệu",
    route: "/about",
  },
  {
    label: "Sản phẩm",
    route: "/products/create",
  },
];

export const translator = {
  title: "tên sản phẩm",
  registrationNumber: "mã số đăng ký",
  image: "hình ảnh sản phẩm",
  imageUrl: "đường link hình ảnh",
  price: "giá sản phẩm",
  ingredient: "nguyên liệu",
  core: "nguyên liệu chính",
  ingredientId: "mã nguyên liệu",
  additive: "phụ gia",
  amount: "liều lượng",
  category: "chủng loại thuốc",
  categoryId: "mã chủng loại",
  formulation: "công thức thuốc",
  formulationId: "mã công thức",
  characteristic: "tính chất thuốc",
  benefit: "lợi ích",
  manual: "hướng dẫn sử dụng",
  intro: "giới thiệu sản phẩm",
  useHow: "cách sử dụng",
  useWhen: "thời điểm sử dụng",
  quarantine: "thời gian cách ly",
  safetyInstruction: "hướng dẫn an toàn chung",
  afterUse: "xử lý sau sử dụng",
  firstAid: "sơ cấp cứu",
  removalTargets: "đối tượng tiêu diệt",
  pestId: "mã sâu bệnh",
  rating: "hiệu quả của thuốc đối với sâu bệnh",
  mfg: "ngày sản suất",
  exp: "hạn sử dụng",
  manufacturer: "đơn vị sản xuất sản phẩm",
  manufacturerId: "mã đơn vị sản xuất sản phẩm",
  register: "đơn vị đăng ký sản phẩm",
  registerId: "mã đơn vị đăng ký sản phẩm",
  packager: "đơn vị đóng gói sản phẩm",
  packagerId: "mã đơn vị đóng gói sản phẩm",
  distributer: "đơn vị phân phối sản phẩm",
  distributerId: "mã đơn vị phân phối sản phẩm",
  distributedAtCountry: "phân phối tại các quốc gia",
};

export const productDefaultValues = {
  title: "",
  registrationNumber: "",
  imageUrl: "",
  price: "",
  ingredients: {
    cores: [
      {
        ingredientId: "",
        amount: "",
      },
    ],
    additive: {
      title: "",
      amount: "",
    },
  },
  categoryId: "",
  formulationId: "",
  characteristic: "",
  benefit: [""],
  manual: {
    intro: "",
    use: {
      how: "",
      when: "",
    },
    quarantine: "",
    safetyInstruction: "",
    afterUse: "",
    firstAid: "",
  },
  removalTargets: [
    {
      pestId: "",
      rating: "",
    },
  ],
  mfg: new Date(),
  exp: "",
  manufacturerId: "",
  registerId: "",
  packagerId: "",
  distributerId: "",
  distributedAt: [
    {
      id: "",
      value: "",
    },
  ],
};