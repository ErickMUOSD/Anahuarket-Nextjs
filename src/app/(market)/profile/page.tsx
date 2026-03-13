import { auth } from "@/server/auth"
import Link from "next/link";
import { getProductsById } from "@/server/services/productService";
import ProductsGrid from '@/features/products/components/ProductsGrid';

export default async function PorfilePage() {

    const session = await auth()

    const product = await getProductsById(Number(session?.user?.id))

    const productosSerialized = product.map((prod) => ({
        ...prod,
        precio: Number(prod.precio),
        fotoproducto: prod.fotoproducto ? true : false,
        fechapublicacion: prod.fechapublicacion.toISOString(),
    }))

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <main className="flex-grow max-w-7xl mx-auto w-full p-6">

                { }
                <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-10">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <p className="text-[#FF6B00] font-black text-sm uppercase tracking-widest mb-1">
                                Estudiante de la Anahuac Cancun
                            </p>
                            <h1 className="text-4xl font-extrabold text-gray-800">
                                {session?.user?.name || "Francisco García"}
                            </h1>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/agregar-producto"
                                className="px-6 py-3 bg-[#FF6B00] text-white font-bold rounded-xl hover:bg-[#e66000] transition-all shadow-lg shadow-orange-200"
                            >
                                AGREGAR PRODUCTO
                            </Link>
                            <Link
                                href={`/editar-perfil/${session?.user?.id}`}
                                className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:border-[#FF6B00] hover:text-[#FF6B00] transition-all"
                            >
                                EDITAR USUARIO
                            </Link>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">
                            Mis Productos en Venta
                        </h2>
                        <span className="bg-orange-100 text-[#FF6B00] px-4 py-1 rounded-full text-xs font-bold">
                            {product?.length || 0} ARTÍCULOS
                        </span>
                    </div>
                    <ProductsGrid
                        products={productosSerialized}
                        userName={session?.user?.name}
                    />
                </section>

            </main>
        </div>
    );

} 