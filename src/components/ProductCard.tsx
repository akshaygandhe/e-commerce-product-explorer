import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  onSelect: (id: number) => void;
  addToCart: (product: Product) => void;
}

export function ProductCard({ product, onSelect, addToCart }: ProductCardProps) {
  return (
    <>
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* Product image */}
        <div className="relative flex h-56 items-center justify-center bg-slate-50 p-6">
          <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-medium capitalize text-slate-600 shadow-sm">
            {product.category}
          </span>

          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
          />
        </div>

        {/* Product information */}
        <div className="flex flex-1 flex-col p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            {product.category}
          </p>

          <h2
            title={product.title}
            className="mt-2 line-clamp-2 min-h-12 text-base font-semibold leading-6 text-slate-900"
          >
            {product.title}
          </h2>

          {/* Price */}
          <p className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
            {product.price}
          </p>

          {/* Rating */}
          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1 text-sm font-semibold text-amber-700">
              <span aria-hidden="true">★</span>
              {product.rating.rate}
            </span>

            <span className="text-xs text-slate-500">
              {product.rating.count} ratings
            </span>
          </div>

          {/* Actions */}
          <div className="mt-auto grid grid-cols-1 gap-2 pt-5">
            <button
              type="button"
              onClick={() => onSelect(product.id)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
            >
              View Details
            </button>

            <button
              type="button"
              onClick={() => addToCart(product)}
              className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
            >
              <span className="mr-2" aria-hidden="true">＋</span>
              Add to Cart
            </button>
          </div>
        </div>
      </article>
    </>
  )
}
