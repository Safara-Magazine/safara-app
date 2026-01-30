export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "White T-Shirt",
    category: "APPAREL",
    price: "₦6,600",
    image: "/images/safara-shirt.png",
  },
  {
    id: 2,
    name: "White Facecap",
    category: "APPAREL",
    price: "₦3,500",
    image: "/images/safara-cap.png",
  },
  {
    id: 3,
    name: "White Mug",
    category: "HOME AND LIVING",
    price: "₦2,640",
    image: "/images/safara-mug.png",
  },
  {
    id: 4,
    name: "White Gold Inscribed Pen",
    category: "STATIONERY",
    price: "₦1,200",
    image: "/images/pen-image.png",
  },
];

export default products;
