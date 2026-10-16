
import type { CartItem as CartItemType } from "../types/product";
import { CartItemRow } from "./CartItem";

interface CartProps {
  items: CartItemType[];
  totalQuantity: number;
  subtotalInINR: number;
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
  onRemove: (productId: number) => void;
  onClear: () => void;
}

export function Cart({
  items,
  totalQuantity,
  subtotalInINR,
  onIncrease,
  onDecrease,
  onRemove,
  onClear,
}: CartProps) {
  return (
    <section
      aria-label="Shopping cart"
      className="mt-12 border-t border-slate-200 pt-8"
    >
      {/* Cart heading */}
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
            Your selections
          </p>

          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Shopping Cart
          </h2>
        </div>

        <p className="text-sm text-slate-500">
          {items.length} {items.length === 1 ? "product" : "products"} ·{" "}
          {totalQuantity} {totalQuantity === 1 ? "unit" : "units"}
        </p>
      </div>

      {/* Empty cart */}
      {items.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="h-7 w-7 text-slate-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l2.4 12.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 7H6"
              />
              <circle cx="10" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>
          </div>

          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            Your cart is empty
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Add a product from the collection to get started.
          </p>
        </div>
      )}

      {/* Cart items and order summary */}
      {items.length > 0 && (
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Items */}
          <div className="space-y-4">
            {items.map((item) => (
              <CartItemRow
                key={item.product.id}
                item={item}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                onRemove={onRemove}
              />
            ))}
          </div>

          {/* Order summary */}
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Order Summary
            </h3>

            <div className="mt-5 space-y-4 border-b border-slate-100 pb-5">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-slate-500">
                  Different products
                </span>

                <span className="font-medium text-slate-900">
                  {items.length}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-slate-500">
                  Total units
                </span>

                <span className="font-medium text-slate-900">
                  {totalQuantity}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 py-5">
              <span className="font-semibold text-slate-900">
                Subtotal
              </span>

              <span className="text-xl font-bold text-slate-900">
                {subtotalInINR}
              </span>
            </div>

            <p className="mb-5 text-xs leading-5 text-slate-500">
              This subtotal uses your project's fixed USD-to-INR
              conversion rate. Shipping and taxes are not included.
            </p>

            <button
              type="button"
              onClick={onClear}
              className="w-full rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
            >
              Clear Cart
            </button>
          </aside>
        </div>
      )}
    </section>
  );
}
