
export interface Product {
  id: string;
  price: number;
  costPrice: number;
  name: string;
  files: string[];
  description: string;
  locationDescription: string;
  googleMapsUrl: string;
  stripePriceId: string;
  paymentUrl: string;
  specifications: Properties[];
  dimensions: Properties[];
  features: Properties[];
  recommendations: Properties[];
  userId: string;
  categoryId: string;
  categoryName: string;
}

export interface Properties {
  name: string;
  value: string[];
}

export const products: Product[] = [
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    price: 49.99,
    costPrice: 14.99,
    name: "Caneca Cantão do Indaiá - Harmonia das Ondas",
    files: [
      "mockup1725584256173-removebg-preview.png",
      "mockup1725584244851-removebg-preview.png",
      "mockup1725584251888-removebg-preview.png",
      "Group 1.png",
      "3c011429-4d3a-44c8-8245-f2ab6aee9b41.mp4",
    ],
    description: "Esta caneca captura a vibe harmoniosa do Cantão do Indaiá, refletindo a serenidade de suas paisagens e a beleza natural. Com um design inspirado nas ondas tranquilas e na vegetação exuberante, ela é perfeita para quem deseja levar um pedacinho dessa atmosfera praiana.",
    locationDescription: "Praia da Enseada, Bertioga, São Paulo.",
    googleMapsUrl: "https://goo.gl/maps/example",
    stripePriceId: "price_1H4vTfKj06jke56aQweq",
    paymentUrl: "https://example.com/payment/caneca",
    specifications: [
      { name: "É apto para lava-louças", value: ["Sim"] },
      { name: "É apto para microondas", value: ["Sim"] },
    ],
    dimensions:
      [
        { name: "Altura", value: ["9.5cm"] },
        { name: "Diâmetro", value: ["8cm"] },
      ],
    features: [
      { name: "Material", value: ["Porcelana"] },
      { name: "Capacidade", value: ["350ml"] },
      { name: "Cor", value: ["Branca"] },
    ],
    recommendations: [
      { name: "Instrções de cuidado", value: ["Lavar à mão para maior durabilidade da estampa."] },
    ],
    userId: "user_456789",
    categoryId: "category_12345",
    categoryName: "Souvenirs",
  },
  {
    id: "123e4567-e89b-asass-a456-asasa",
    price: 49.99,
    costPrice: 14.99,
    name: "Caneca Praia do Indaiá - Um Dia Dourado",
    files: [
      "mockup1725584256173-removebg-preview.png",
      "mockup1725584244851-removebg-preview.png",
      "mockup1725584251888-removebg-preview.png",
      "Group 1.png",
      "3c011429-4d3a-44c8-8245-f2ab6aee9b41.mp4",
    ],
    description: "Esta caneca retrata a beleza de um dia ensolarado na Praia do Indaiá, onde o mar se transforma em um espetáculo de cores se fundem ao horizonte. Ideal para quem deseja reviver esses momentos todos os dias. Perfeita para os amantes da natureza e da de um dia ensolarado à beira-mar.",
    locationDescription: "Praia da Enseada, Bertioga, São Paulo.",
    googleMapsUrl: "https://goo.gl/maps/example",
    stripePriceId: "price_1H4vTfKj06jke56aQweq",
    paymentUrl: "https://example.com/payment/caneca",
    specifications: [
      { name: "É apto para lava-louças", value: ["Sim"] },
      { name: "É apto para microondas", value: ["Sim"] },
    ],
    dimensions:
      [
        { name: "Altura", value: ["9.5cm"] },
        { name: "Diâmetro", value: ["8cm"] },
      ],
    features: [
      { name: "Material", value: ["Porcelana"] },
      { name: "Capacidade", value: ["350ml"] },
      { name: "Cor", value: ["Branca"] },
    ],
    recommendations: [
      { name: "Instrções de cuidado", value: ["Lavar à mão para maior durabilidade da estampa."] },
    ],
    userId: "user_456789",
    categoryId: "category_12345",
    categoryName: "Souvenirs",
  },
  {
    id: "123e4ass567-e89b-12d3-a456-asasa",
    price: 49.99,
    costPrice: 14.99,
    name: "Caneca Personalizada Praia da Enseada Bertioga",
    files: [
      "mockup1725584256173-removebg-preview.png",
      "mockup1725584244851-removebg-preview.png",
      "mockup1725584251888-removebg-preview.png",
      "Group 1.png",
      "3c011429-4d3a-44c8-8245-f2ab6aee9b41.mp4",
    ],
    description: "Caneca de porcelana personalizada com a vista da Praia da Enseada, em Bertioga.",
    locationDescription: "Praia da Enseada, Bertioga, São Paulo.",
    googleMapsUrl: "https://goo.gl/maps/example",
    stripePriceId: "price_1H4vTfKj06jke56aQweq",
    paymentUrl: "https://example.com/payment/caneca",
    specifications: [
      { name: "É apto para lava-louças", value: ["Sim"] },
      { name: "É apto para microondas", value: ["Sim"] },
    ],
    dimensions:
      [
        { name: "Altura", value: ["9.5cm"] },
        { name: "Diâmetro", value: ["8cm"] },
      ],
    features: [
      { name: "Material", value: ["Porcelana"] },
      { name: "Capacidade", value: ["350ml"] },
      { name: "Cor", value: ["Branca"] },
    ],
    recommendations: [
      { name: "Instrções de cuidado", value: ["Lavar à mão para maior durabilidade da estampa."] },
    ],
    userId: "user_456789",
    categoryId: "category_12345",
    categoryName: "Souvenirs",
  },
  {
    id: "123e4ass567-e89b-assa-a456-asasa",
    price: 49.99,
    costPrice: 14.99,
    name: "Caneca Personalizada Praia da Enseada Bertioga",
    files: [
      "mockup1725584256173-removebg-preview.png",
      "mockup1725584244851-removebg-preview.png",
      "mockup1725584251888-removebg-preview.png",
      "Group 1.png",
      "3c011429-4d3a-44c8-8245-f2ab6aee9b41.mp4",
    ],
    description: "Caneca de porcelana personalizada com a vista da Praia da Enseada, em Bertioga.",
    locationDescription: "Praia da Enseada, Bertioga, São Paulo.",
    googleMapsUrl: "https://goo.gl/maps/example",
    stripePriceId: "price_1H4vTfKj06jke56aQweq",
    paymentUrl: "https://example.com/payment/caneca",
    specifications: [
      { name: "É apto para lava-louças", value: ["Sim"] },
      { name: "É apto para microondas", value: ["Sim"] },
    ],
    dimensions:
      [
        { name: "Altura", value: ["9.5cm"] },
        { name: "Diâmetro", value: ["8cm"] },
      ],
    features: [
      { name: "Material", value: ["Porcelana"] },
      { name: "Capacidade", value: ["350ml"] },
      { name: "Cor", value: ["Branca"] },
    ],
    recommendations: [
      { name: "Instrções de cuidado", value: ["Lavar à mão para maior durabilidade da estampa."] },
    ],
    userId: "user_456789",
    categoryId: "category_12345",
    categoryName: "Souvenirs",
  },
  {
    id: "asasasas-e89b-assa-a456-asasa",
    price: 49.99,
    costPrice: 14.99,
    name: "Caneca Personalizada Praia da Enseada Bertioga",
    files: [
      "mockup1725584256173-removebg-preview.png",
      "mockup1725584244851-removebg-preview.png",
      "mockup1725584251888-removebg-preview.png",
      "Group 1.png",
      "3c011429-4d3a-44c8-8245-f2ab6aee9b41.mp4",
    ],
    description: "Caneca de porcelana personalizada com a vista da Praia da Enseada, em Bertioga.",
    locationDescription: "Praia da Enseada, Bertioga, São Paulo.",
    googleMapsUrl: "https://goo.gl/maps/example",
    stripePriceId: "price_1H4vTfKj06jke56aQweq",
    paymentUrl: "https://example.com/payment/caneca",
    specifications: [
      { name: "É apto para lava-louças", value: ["Sim"] },
      { name: "É apto para microondas", value: ["Sim"] },
    ],
    dimensions:
      [
        { name: "Altura", value: ["9.5cm"] },
        { name: "Diâmetro", value: ["8cm"] },
      ],
    features: [
      { name: "Material", value: ["Porcelana"] },
      { name: "Capacidade", value: ["350ml"] },
      { name: "Cor", value: ["Branca"] },
    ],
    recommendations: [
      { name: "Instrções de cuidado", value: ["Lavar à mão para maior durabilidade da estampa."] },
    ],
    userId: "user_456789",
    categoryId: "category_12345",
    categoryName: "Souvenirs",
  },
  {
    id: "asasasas-e89b-assa-a456-xcxcxcx",
    price: 49.99,
    costPrice: 14.99,
    name: "Caneca Personalizada Praia da Enseada Bertioga",
    files: [
      "mockup1725584256173-removebg-preview.png",
      "mockup1725584244851-removebg-preview.png",
      "mockup1725584251888-removebg-preview.png",
      "Group 1.png",
      "3c011429-4d3a-44c8-8245-f2ab6aee9b41.mp4",
    ],
    description: "Caneca de porcelana personalizada com a vista da Praia da Enseada, em Bertioga.",
    locationDescription: "Praia da Enseada, Bertioga, São Paulo.",
    googleMapsUrl: "https://goo.gl/maps/example",
    stripePriceId: "price_1H4vTfKj06jke56aQweq",
    paymentUrl: "https://example.com/payment/caneca",
    specifications: [
      { name: "É apto para lava-louças", value: ["Sim"] },
      { name: "É apto para microondas", value: ["Sim"] },
    ],
    dimensions:
      [
        { name: "Altura", value: ["9.5cm"] },
        { name: "Diâmetro", value: ["8cm"] },
      ],
    features: [
      { name: "Material", value: ["Porcelana"] },
      { name: "Capacidade", value: ["350ml"] },
      { name: "Cor", value: ["Branca"] },
    ],
    recommendations: [
      { name: "Instrções de cuidado", value: ["Lavar à mão para maior durabilidade da estampa."] },
    ],
    userId: "user_456789",
    categoryId: "category_12345",
    categoryName: "Souvenirs",
  },
];