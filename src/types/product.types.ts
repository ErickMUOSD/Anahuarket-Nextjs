// para el home
export type ProductCardDTO = {
  idproducto: number
  nombreproducto: string
  precio: number
  fotoproducto: boolean
  vendedor: { nombre: string }
  categoria: { nombrecategoria: string }
}

// para detalles de producto
export type ProductDetailDTO = {
  idproducto: number
  nombreproducto: string
  precio: number
  fotoproducto: boolean
  descripcion: string | null
  stock: number
  vendedor: { nombre: string, telefono: string }
  categoria: { nombrecategoria: string }
}