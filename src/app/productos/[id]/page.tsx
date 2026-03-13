import { getProductById } from "@/server/services/productService"
import { auth } from "@/server/auth"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { ArrowLeft, Phone } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function DetalleProductoPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const [producto, session] = await Promise.all([
    getProductById(Number(id)),
    auth()
  ])

  if (!producto) notFound()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header nombreUsuario={session?.user?.name} />

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-10">

        {/* Volver */}
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-500 hover:text-[#FF6B00] transition-colors text-sm mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al listado
        </Link>

        <div className="flex flex-col md:flex-row gap-10">

          {/* Foto */}
          <div className="w-full md:w-1/2">
            <div className="rounded-2xl overflow-hidden bg-gray-100 h-96">
              {producto.fotoproducto ? (
                <img
                  src={`/api/productos/${producto.idproducto}/foto`}
                  alt={producto.nombreproducto}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src="/placeholder.png"
                  alt="Sin imagen"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          {/* Info */}
          <div className="w-full md:w-1/2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col gap-6">

              {/* Vendedor */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-[#FF6B00] font-black text-lg">
                  {producto.vendedor.nombre.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">Vendedor</p>
                  <p className="font-bold text-gray-800">{producto.vendedor.nombre}</p>
                </div>
              </div>

              {/* Nombre y precio */}
              <div>
                <h1 className="text-3xl font-black text-gray-800 uppercase">
                  {producto.nombreproducto}
                </h1>
                <p className="text-3xl text-[#FF6B00] font-black mt-2">
                  ${Number(producto.precio).toLocaleString('es-MX')}
                </p>
              </div>

              {/* Descripción */}
              {producto.descripcion && (
                <div>
                  <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide mb-1">Descripción</p>
                  <p className="text-gray-700 text-sm">{producto.descripcion}</p>
                </div>
              )}

              {/* Stock */}
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide mb-1">Stock</p>
                <p className="text-gray-800 font-semibold">{producto.stock} disponible(s)</p>
              </div>

              {/* Teléfono */}
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
                <Phone className="h-5 w-5 text-[#FF6B00]" />
                <div>
                  <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">Teléfono del vendedor</p>
                  <p className="text-gray-800 font-bold">{producto.vendedor.telefono}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}