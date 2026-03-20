"use server"
import { createProduct } from "@/server/services/productService"
import type { CreateProductDTO } from "@/types/product.types"

export async function createProductAction(data: CreateProductDTO) {
  try {
    const product = await createProduct(data)
    return { id: product.idproducto }
  } catch (error) {
    console.error("[createProduct] Error:", error)
    return { error: "Error al publicar el producto" }
  }
}