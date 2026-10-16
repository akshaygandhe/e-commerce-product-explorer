import { useState, useEffect } from 'react'
import type { CartItem, Product } from './types/product'
import { getProducts } from './services/productApi';
import { ProductCard } from './components/ProductCard';
import './App.css'
import { ProductDetails } from './components/ProductDetails';
import { Cart } from './components/Cart';

type SortOption = "" | "low to high" | "high to low" | "highest first";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState<string>("")
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [sort, setSort] = useState<SortOption>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItem, setCartItem] = useState<CartItem[]>([]);

  // Fetch products when the app starts
  useEffect(() => {
    async function loadAllProducts() {
      setError(null);

      try {
        const allProducts = await getProducts();
        setProducts(allProducts);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError("Failed to load products.")
        }
      }
      finally {
        setLoading(false);
      }
    }

    loadAllProducts();
  }, [])

  function handleSelectedProduct(id: number) {
    const product = products.find((product) => product.id === id)
    if (product) {
      setSelectedProduct(product);
    }
  }

  function handleDialogClose() {
    setSelectedProduct(null);
  }

  function handleAddToCart(product: Product) {
    setCartItem((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...currentCart,
        {
          product,
          quantity: 1,
        },
      ];
    });
  }

  const duplicateCategories = products.map((product) => product.category)

  const categories = [...new Set(duplicateCategories)]

  const filteredProducts = products.filter((product) => {

    const matchesSearch =
      product.title
        .toLowerCase()
        .includes(search.trim().toLowerCase());

    const matchesCategory =
      categoryFilter === "" ||
      product.category === categoryFilter;

    return matchesSearch && matchesCategory;
  }
  )

  const sortedProducts = [...filteredProducts];

  if (sort === "low to high") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "high to low") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sort === "highest first") {
    sortedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
  }

  function handleIncreaseQuantity(productId: number) {
    setCartItem((currentCart) =>
      currentCart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  // Decrease quantity, but never below one
  function handleDecreaseQuantity(productId: number) {
    setCartItem((currentCart) =>
      currentCart.map((item) =>
        item.product.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  }

  // Remove a product entirely
  function handleRemoveFromCart(productId: number) {
    setCartItem((currentCart) =>
      currentCart.filter(
        (item) => item.product.id !== productId
      )
    );
  }

  // Remove every item from the cart
  function handleClearCart() {
    setCartItem([]);
  }

  // Derived cart calculations
  const totalCartQuantity = cartItem.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartSubtotalInINR = cartItem.reduce(
    (subtotal, item) =>
      subtotal +
      item.product.price * item.quantity,
    0
  );

  // Clear search, category, and sorting
  function handleClearFilters() {
    setSearch("");
    setCategoryFilter("");
    setSort("");
  }

  const hasActiveFilters =
    search.trim() !== "" ||
    categoryFilter !== "" ||
    sort !== "";

  return (
    <>
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
                  Your next favorite find
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Product Explorer
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                  Explore our product collection and discover something
                  you'll love.
                </p>
              </div>

              {!loading && !error && products.length > 0 && (
                <div className="w-fit rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
                  {search.trim()
                    ? `${filteredProducts.length} of ${products.length} products`
                    : `${products.length} products`}
                </div>
              )}
            </div>
          </header>

          {/* Loading state */}
          {loading && (
            <section
              role="status"
              aria-live="polite"
              className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm"
            >
              <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

              <h2 className="mt-5 text-lg font-semibold text-slate-900">
                Loading products...
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Fetching product information.
              </p>
            </section>
          )}

          {/* Error state */}
          {!loading && error && (
            <section
              role="alert"
              className="rounded-2xl border border-red-200 bg-white px-6 py-12 text-center shadow-sm"
            >
              <h2 className="text-lg font-semibold text-red-700">
                Something went wrong
              </h2>

              <p className="mt-2 text-sm text-slate-600">{error}</p>
            </section>
          )}

          {/* Main content */}
          {!loading && !error && (
            <>
              {/* API returned no products */}
              {products.length === 0 && (
                <section className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                  <h2 className="text-lg font-semibold text-slate-900">
                    No products available
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    There are currently no products to display.
                  </p>
                </section>
              )}

              {products.length > 0 && (
                <>
                  {/* Search UI */}
                  <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                    <label
                      htmlFor="productsearch"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Find your next favorite
                    </label>

                    <div className="relative">
                      {/* Search icon */}
                      <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                      >
                        <circle cx="11" cy="11" r="7" />
                        <path
                          strokeLinecap="round"
                          d="m16 16 4 4"
                        />
                      </svg>

                      <input
                        type="text"
                        id="productsearch"
                        name="productsearch"
                        placeholder="Search products by title..."
                        value={search}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                      />

                      {search.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setSearch("")}
                          aria-label="Clear search"
                          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    {/* Category and Sort */}
                    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {/* Category Filter */}
                      <div>
                        <label
                          htmlFor="productcategory"
                          className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                          Category
                        </label>

                        <select
                          id="productcategory"
                          name="productcategory"
                          value={categoryFilter}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategoryFilter(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                        >
                          <option value="">All Categories</option>

                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Sort Filter */}
                      <div>
                        <label
                          htmlFor="sortproduct"
                          className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                          Sort By
                        </label>

                        <select
                          id="sortproduct"
                          name="sortproduct"
                          value={sort}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSort(e.target.value as SortOption)}
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                        >
                          <option value="">Default Order</option>
                          <option value="low to high">
                            Price: Low to High
                          </option>
                          <option value="high to low">
                            Price: High to Low
                          </option>
                          <option value="highest first">
                            Rating: Highest First
                          </option>
                        </select>
                      </div>
                    </div>

                    {/* Clear All Filters */}
                    {hasActiveFilters && (
                      <div className="mt-4 flex justify-end">
                        <button
                          type="button"
                          onClick={handleClearFilters}
                          className="rounded-lg px-3 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50 hover:text-indigo-800"
                        >
                          Clear all filters
                        </button>
                      </div>
                    )}
                  </section>

                  {/* Product Results */}
                  <section aria-label="Product collection">
                    <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <h2 className="text-lg font-semibold text-slate-900">
                        {hasActiveFilters
                          ? "Filtered Products"
                          : "All Products"}
                      </h2>

                      <p
                        className="text-sm text-slate-500"
                        aria-live="polite"
                      >
                        Showing {sortedProducts.length} of{" "}
                        {products.length} products
                      </p>
                    </div>

                    {/* Matching Products */}
                    {sortedProducts.length > 0 && (
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {sortedProducts.map((product) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            onSelect={handleSelectedProduct}
                            addToCart={handleAddToCart}
                          />
                        ))}
                      </div>
                    )}

                    {/* No Matching Results */}
                    {sortedProducts.length === 0 && (
                      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                          <svg
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="h-6 w-6"
                          >
                            <circle cx="11" cy="11" r="7" />
                            <path
                              strokeLinecap="round"
                              d="m16 16 4 4"
                            />
                          </svg>
                        </div>

                        <h3 className="mt-4 text-lg font-semibold text-slate-900">
                          No matching products found
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                          Try changing your search, category, or sorting
                          options.
                        </p>

                        <button
                          type="button"
                          onClick={handleClearFilters}
                          className="mt-5 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                        >
                          Reset filters
                        </button>
                      </div>
                    )}
                  </section>
                </>
              )}

              {/* Cart */}
              <Cart
                items={cartItem}
                totalQuantity={totalCartQuantity}
                subtotalInINR={cartSubtotalInINR}
                onIncrease={handleIncreaseQuantity}
                onDecrease={handleDecreaseQuantity}
                onRemove={handleRemoveFromCart}
                onClear={handleClearCart}
              />
            </>
          )}

          {/* Open Product details pop-up */}
          {selectedProduct && (
            <ProductDetails
              product={selectedProduct}
              onClose={handleDialogClose}
              addToCart={handleAddToCart}
            />
          )}
        </div>
      </main>
    </>
  )
}

export default App
