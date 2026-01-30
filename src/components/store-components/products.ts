export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
}

 export const products: Product[] = [
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

export const newProducts: Product[] = [
     {
    id: 1,
    name: "White T-Shirt",
    category: "APPAREL",
    price: "₦6,600",
    image: "/images/safara-shirt.png",
  },
    {
      id: 2,
      name: 'Safara Ball-Point Pen',
      category: 'STATIONERY',
      price: '₦700',
      image: '/images/pen-image.png'
    },
    {
      id: 3,
      name: 'Safara Premium Tote Bag',
      category: 'APPAREL',
      price: '₦4,500',
      image: '/images/tote-bag.png'
    },
    {
      id: 4,
      name: 'Safara Magazine Issue 20',
      category: 'ENTERTAINMENT',
      price: '₦2,000',
      image: '/images/safara-pack.png'
    }
  ];
