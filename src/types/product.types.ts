// para el home
export type ProductCardDTO = {
  idproducto: number
  nombreproducto: string
  precio: number
  fotoproducto: boolean
  fotourl: string | null
  vendedor: { nombre: string }
  categoria: { nombrecategoria: string }
}

// para detalles de producto
export type ProductDetailDTO = {
  idproducto: number
  nombreproducto: string
  precio: number
  fotoproducto: boolean
  fotourl: string | null
  descripcion: string | null
  stock: number
  vendedor: { nombre: string, telefono: string }
  categoria: { nombrecategoria: string }
}

// para crear un producto
export type CreateProductDTO = {
  nombreproducto: string
  descripcion: string
  idcategoria: number
  iddisponibilidad: number
  precio: number
  stock: number
  idusuario: number
  imageUrl?: string 
}