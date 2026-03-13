export type ProductDTO = {
  idproducto: number
  nombreproducto: string
  precio: number
  fotoproducto: boolean
  vendedor: { nombre: string }
  categoria: { nombrecategoria: string }
}