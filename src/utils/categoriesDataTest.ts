export interface Category {
    id: string;
    name: string;
    parent?: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId?: string;
    user?: string[];
    products: string[];
}

export const categories: Category[] = [
    {
        id: "category_enseada",
        name: "Praia da Enseada",
        parent: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "user_456789",
        user: [
            "qwww-e89b-12d3-a456-asasas",
        ],
        products: [
          "123e4567-e89b-12d3-a456-426614174000",
        ],
    },
];