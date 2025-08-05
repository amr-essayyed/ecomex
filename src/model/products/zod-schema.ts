import { z } from 'zod';

export const productSchema = z.object({
    _id: z.string(), // Mongoose ObjectId as string
    title: z.string().optional(),
    description: z.string().optional(),
    price: z.number().nonnegative(),
    category: z.string().optional(),
    imageUrl: z.url().optional(),
    createdAt: z.coerce.date().optional(), // allows ISO strings
    updatedAt: z.coerce.date().optional(), // allows ISO strings
    __v: z.number().optional(), // Mongoose version key
});

export const productPostSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    price: z.number().nonnegative(),
    category: z.string().optional(),
    imageUrl: z.url().optional(),
});

export const productPatchSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    price: z.number().nonnegative().optional(),
    category: z.string().optional(),
    imageUrl: z.url().optional(),
});



export type Product = z.infer<typeof productSchema>; 