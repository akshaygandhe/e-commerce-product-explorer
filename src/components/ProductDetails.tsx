import type { Product } from "../types/product"
interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
  addToCart: (product: Product) => void;
}

export function ProductDetails({ product, onClose, addToCart }: ProductDetailsProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-details-title"
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Modal header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-5 py-4 backdrop-blur sm:px-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
              Product Details
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Explore this product
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close product details"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-2xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            ×
          </button>
        </div>

        {/* Product content */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="flex min-h-72 items-center justify-center bg-slate-50 p-8 sm:p-12">
            <img
              src={product.image}
              alt={product.title}
              className="h-64 w-full object-contain transition duration-300 hover:scale-105 sm:h-80"
            />
          </div>

          {/* Information */}
          <div className="flex flex-col p-6 sm:p-8">
            <span className="w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold capitalize text-indigo-700">
              {product.category}
            </span>

            <h2
              id="product-details-title"
              className="mt-4 text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl"
            >
              {product.title}
            </h2>

            {/* Rating */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="rounded-lg bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-700">
                ★ {product.rating.rate}
              </span>

              <span className="text-sm text-slate-500">
                {product.rating.count} ratings
              </span>
            </div>

            {/* Price */}
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Price
              </p>

              <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                {product.price}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Approximate conversion from USD
              </p>
            </div>

            {/* Description */}
            <div className="mt-6 border-t border-slate-100 pt-5">
              <h3 className="text-sm font-semibold text-slate-900">
                Product Description
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-600">
                {product.description}
              </p>
            </div>

            {/* Actions */}
            <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
              <button
                type="button"
                onClick={() => addToCart(product)}
                className="flex-1 rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
              >
                <span className="mr-2" aria-hidden="true">＋</span>
                Add to Cart
              </button>

              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

