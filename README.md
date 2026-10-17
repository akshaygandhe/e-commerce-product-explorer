# E-Commerce Product Explorer

A responsive e-commerce web application built with React, TypeScript, Vite, and Tailwind CSS. Browse products, search by title, filter by category, sort by price or rating, view product details, and manage a shopping cart.

## Features

### Product Browsing

- Fetch product data from the [Fake Store API](https://fakestoreapi.com/products).
- Display products in a responsive grid with reusable product cards.
- Show product images, titles, categories, prices, and ratings.
- Handle loading, error, and empty states.

### Search, Filtering, and Sorting

- Search products by title.
- Support case-insensitive search and ignore leading and trailing spaces.
- Filter products dynamically by category.
- Sort products by default order, price from low to high, price from high to low, and rating from highest to lowest.
- Combine search, category filtering, and sorting.

### Product Details

- View product information in a modal dialog.
- Display the product image, full description, category, price, and rating.
- Close the modal and return to the product grid without losing the active filters.

### Shopping Cart

- Add products from product cards or the product details modal.
- Increase the quantity of an existing cart item instead of creating duplicate entries.
- Increase and decrease item quantities.
- Remove individual products.
- Clear the entire cart.
- Calculate individual item totals and the cart subtotal.
- Display an empty-cart state.

### User Interface

- Responsive layouts for mobile, tablet, and desktop.
- Tailwind CSS styling.
- Reusable React components with TypeScript props and interfaces.
- Accessible labels and focus states for interactive controls.

### Price Display

- Display product prices using the price values supplied by the Fake Store API.
- Use consistent price formatting across product cards, product details, and the shopping cart.
- No currency conversion or live exchange-rate integration is used.

**Note:** The prices come from a sample product API and should not be considered actual retail prices.

## Tech Stack

- **React** — Component-based UI development
- **TypeScript** — Static typing for products, props, and cart data
- **Vite** — Development server and production build tooling
- **Tailwind CSS** — Responsive UI styling
- **Fake Store API** — Sample product data
- **Fetch API** — Asynchronous product requests
- **React Hooks** — State management and side effects

## Project Structure

The following is an example structure. Adjust it to match the actual files in your repository.

```text
ecommerce-product-explorer/
├── public/
├── src/
│   ├── components/
│   │   ├── Cart.tsx
│   │   ├── CartItem.tsx
│   │   ├── ProductCard.tsx
│   │   └── ProductDetails.tsx
│   ├── services/
│   │   └── productApi.ts
│   ├── types/
│   │   └── product.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## API Reference

This project uses the Fake Store API to retrieve sample product information.

- **Products endpoint:** https://fakestoreapi.com/products

No API key is required for the products endpoint.

## Current Limitations

- Product data comes from a sample API rather than a real e-commerce backend.
- The displayed product prices are not converted into another currency.
- The shopping cart is maintained in React state and resets when the page is refreshed.
- Checkout, payment processing, user accounts, and order management are not implemented.

## Future Improvements

- Persist the cart using localStorage.
- Add product pagination.
- Improve filtering and product availability handling.
- Add automated component and interaction tests.
- Add checkout and order management with a backend.

## Learning Outcomes

This project provides practical experience with:

- React components, props, and state.
- TypeScript interfaces and typed callbacks.
- API integration and asynchronous request handling.
- Controlled inputs and live search.
- Array filtering, sorting, and derived data.
- Immutable state updates.
- Shopping cart quantity and subtotal calculations.
- Responsive UI development with Tailwind CSS.

## License

This project is intended for learning and portfolio demonstration. Add a license file if you want to specify how others may reuse your code.