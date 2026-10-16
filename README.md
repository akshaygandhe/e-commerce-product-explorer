# E-Commerce Product Explorer

A responsive e-commerce web application built with React, TypeScript, Vite, and Tailwind CSS. Browse products, search by title, filter by category, sort by price or rating, view product details, and manage a shopping cart.

## Features

### Product Browsing
- Fetch product data from the [Fake Store API].
- Display products in a responsive grid with reusable product cards.
- Show product images, titles, categories, prices, and ratings.
- Display loading, error, and empty states.

### Search, Filtering, and Sorting
- Search products by title.
- Search with case-insensitive matching and support for extra spaces.
- Filter products by category.
- Sort by default order, price from low to high, price from high to low, or highest rating first.
- Combine search, category filtering, and sorting.

### Product Details
- Open a product details modal.
- View the full description, image, category, price, and rating information.
- Close the modal and return to the product grid without losing the active filters.

### Shopping Cart
- Add products from product cards or the product details modal.
- Increase the quantity of an existing cart item when the same product is added again.
- Increase and decrease item quantities.
- Remove individual products.
- Clear the entire cart.
- Calculate item totals and the cart subtotal.
- Display an empty-cart state.

### User Interface
- Responsive layouts for mobile, tablet, and desktop.
- Tailwind CSS styling.
- Reusable, typed React components.
- Accessible labels and focus states for interactive controls.
