import * as z from "zod";

export const UserRegisterSchema = z.object({
    customerName: z.string().min(1, { message: "Este campo é obrigatório" }),
    email: z.string().email({ message: "Este campo é obrigatório" }),
    phone: z.string().optional(),
    password: z.string().min(6, { message: "Insira no mínimo 6 caracteres para senha" }),
});

export const UserDataSecuritySchema = z.object({
    password: z.optional(z.string().min(6, { message: "Insira no mínimo 8 caractéres para senha" })),
    confirmPassword: z.optional(z.string().min(6, { message: "As senhas devem ser iguais" })),
    isTwoFactorEnabled: z.optional(z.boolean()),
});

export const UserPersonalDataSchema = z.object({
    customerName: z.optional(z.string()),
    email: z.optional(z.string().email()),
    phone: z.string().optional(),
});

export const LoginSchema = z.object({
    email: z.string().email({ message: "Este campo é obrigatório" }),
    password: z.string().min(1, { message: "Este campo é obrigatório" }),
    code: z.string().optional(),
});

export const NewPasswordSchema = z.object({
    password: z.string().min(6, { message: "Este campo é obrigatório" }),
});

export const ResetSchema = z.object({
    email: z.string().email({ message: "Insira um email válido" }),
});

export const OrderSchema = z.object({
    line_items: z.object({}).optional(),
    customerName: z.string().optional(),
    isCustomer: z.boolean().optional(),
    email: z.string().optional(),
    phone: z.string().min(1, { message: "Este campo é obrigatório" }),
    city: z.string().min(1, { message: "Este campo é obrigatório" }),
    state: z.string().min(1, { message: "Este campo é obrigatório" }),
    zip: z.string().min(1, { message: "Este campo é obrigatório" }),
    street: z.string().min(1, { message: "Este campo é obrigatório" }),
    streetNumber: z.string().min(1, { message: "Este campo é obrigatório" }),
    cartProducts: z.array(z.string(), { message: "Este campo é obrigatório" }),
    paid: z.boolean().optional(),
});

export const PropertySchema = z.object({
    name: z.string().min(1, { message: "Este campo é obrigatório" }),
    value: z.array(z.string()).min(1, { message: "Este campo é obrigatório" }),
});

export const ProductSchema = z.object({
    id: z.string().optional(),
    files: z.array(z.string()).optional(),
    name: z.string().min(1, { message: "Este campo é obrigatório" }),
    price: z.string().min(1, { message: "Este campo é obrigatório" }),
    costPrice: z.string().min(1, { message: "Este campo é obrigatório" }),
    description: z.string().min(1, { message: "Este campo é obrigatório" }),
    locationDescription: z.string().min(1, { message: "Este campo é obrigatório" }),
    paymentUrl: z.string().optional(),
    googleMapsUrl: z.string().optional(),
    categoryId: z.string().optional(),
    categoryName: z.string().optional(),
    specifications: z.array(PropertySchema).optional(),
    dimensions: z.array(PropertySchema).optional(),
    features: z.array(PropertySchema).optional(),
    recommendation: z.array(PropertySchema).optional(),
});

export const CategorySchema = z.object({    
    id: z.string().optional(),
    name: z.string().min(1, { message: "Este campo é obrigatório" }),
    parent: z.string().optional(),
});