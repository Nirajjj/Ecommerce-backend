import { z } from "zod";

export const addToCartSchema = z.object({
  productId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Product ID format"),
  quantity: z
    .number({
      error: "Quantity must be a number",
    })
    .int()
    .min(1, "Quantity must be at least 1")
    .default(1),
});

// You can validate params and body together
export const updateCartSchema = z.object({
  params: z.object({
    productId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Product ID"),
  }),
  body: z.object({
    quantity: z.coerce.number().int().min(1, "Quantity must be at least 1"),
  }),
});

export type AddToCartInput = z.infer<typeof addToCartSchema>;
export type UpdateCartInput = z.infer<typeof updateCartSchema>;
