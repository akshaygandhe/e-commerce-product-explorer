import type { CartItem as CartItemType } from "../types/product";

interface CartItemProps {
  item: CartItemType;
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
  onRemove: (productId: number) => void;
}

export function CartItemRow({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center">
      {/* Product image */}
      <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-slate-50 p-3">
        <img
          src={item.product.image}
          alt={item.product.title}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Product information */}
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
          {item.product.category}
        </p>

        <h3 className="mt-1 line-clamp-2 font-semibold text-slate-900">
          {item.product.title}
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          {item.product.price} per item
        </p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-3 self-start sm:self-center">
        <button
          type="button"
          aria-label={`Decrease quantity of ${item.product.title}`}
          disabled={item.quantity <= 1}
          onClick={() => onDecrease(item.product.id)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-lg text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          −
        </button>

        <span
          className="min-w-6 text-center text-sm font-semibold text-slate-900"
          aria-label={`Quantity: ${item.quantity}`}
        >
          {item.quantity}
        </span>

        <button
          type="button"
          aria-label={`Increase quantity of ${item.product.title}`}
          onClick={() => onIncrease(item.product.id)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-lg text-slate-700 transition hover:bg-slate-100"
        >
          +
        </button>
      </div>

      {/* Line total and remove */}
      <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-3 sm:w-36 sm:flex-col sm:items-end sm:justify-center sm:border-t-0 sm:pt-0">
        <p className="font-bold text-slate-900">
          {item.product.price * item.quantity}
        </p>

        <button
          type="button"
          onClick={() => onRemove(item.product.id)}
          className="text-sm font-medium text-red-600 transition hover:text-red-800"
        >
          Remove
        </button>
      </div>
    </article>
  );
}
