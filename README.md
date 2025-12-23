# Food Product Explorer

A React-based web application that allows users to search, filter, and view detailed information about food products using the OpenFoodFacts API. This project was built as part of an assignment to demonstrate frontend development skills including API integration, state management, and responsive design.

## Table of Contents

- [Objective](#objective)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Methodology & Approach](#methodology--approach)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)

## Objective

The goal was to create a responsive web application to explore food products. Key requirements included fetching data from the OpenFoodFacts API, implementing search and filter functionalities, displaying detailed product information, and managing a shopping cart.

## Technologies Used

- **Frontend Framework**: React.js (v19)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (v4)
- **Routing**: React Router DOM (v7)
- **State Management**: React Context API (for Cart) & React Hooks
- **API**: OpenFoodFacts API

## Features

1.  **Homepage**:
    - Displays a grid of food products.
    - **Pagination**: "Load More" functionality to fetch additional products.
    - **Responsive Design**: Adapts to mobile, tablet, and desktop screens.

2.  **Search & Filter**:
    - **Search by Name**: Real-time search for products.
    - **Search by Barcode**: Direct lookup using product barcode.
    - **Category Filter**: Filter products by categories (e.g., Snacks, Dairies).
    - **Sorting**: Sort products by Name (A-Z, Z-A) or Nutrition Grade.

3.  **Product Detail Page**:
    - Detailed view of a selected product.
    - Displays product image, ingredients, nutrition grade, nutritional values (energy, fat, carbs, etc.), and labels.
    - "Add to Cart" functionality.

4.  **Shopping Cart**:
    - Global cart state managed via Context API.
    - Add products from Homepage or Detail page.
    - View cart items, update quantities, or remove items.
    - Cart data persists in `localStorage`.

## Methodology & Approach

### 1. Component-Based Architecture
The application is broken down into small, reusable components to maintain clean and manageable code.
- **Pages**: `Homepage`, `ProductDetail`, `Cart`.
- **Components**: `Navbar`, `ProductCard`, `SearchBar`, `CategoryFilter`, `SortOptions`.

### 2. API Integration
All API calls are centralized in `src/services/api.js`. This separation of concerns makes the code easier to test and maintain.
- `fetchProducts`: Fetches default list.
- `searchProducts`: Searches by name.
- `getProductByBarcode`: Fetches single product details.
- `getCategories`: Fetches list of categories.
- `getProductsByCategory`: Filters by category.

### 3. State Management
- **Local State**: Used `useState` for component-specific data like search queries, loading states, and product lists.
- **Global State**: Used **React Context API** (`CartContext`) to manage the shopping cart state across the application. This avoids prop drilling and makes cart data accessible from the Navbar, Product Cards, and Cart Page.
- **Persistence**: `useEffect` is used to save and retrieve cart data from `localStorage`, ensuring the cart is not lost on page refresh.

### 4. Styling
**Tailwind CSS** was used for styling. It provides a utility-first approach, allowing for rapid UI development and easy responsive design without writing custom CSS files.
- **Theme**: A clean, white/minimalist theme was chosen.
- **Responsiveness**: Grid layouts (`grid-cols-1` to `grid-cols-4`) ensure the app looks good on all device sizes.

### 5. Routing
**React Router** handles navigation.
- `/`: Homepage (Search, Filter, List).
- `/product/:id`: Dynamic route for product details.
- `/cart`: Shopping cart view.

## Project Structure

```
src/
├── assets/             # Static assets
├── components/         # Reusable UI components
│   ├── CategoryFilter.jsx
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   ├── SearchBar.jsx
│   └── SortOptions.jsx
├── context/            # Global state context
│   └── CartContext.jsx
├── pages/              # Page components
│   ├── Cart.jsx
│   ├── Homepage.jsx
│   └── ProductDetail.jsx
├── services/           # API service functions
│   └── api.js
├── App.jsx             # Main application component with Routing
├── main.jsx            # Entry point
└── index.css           # Global styles & Tailwind imports
```

## Setup & Installation

1.  **Clone the repository** (if applicable) or extract the project files.
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Run the development server**:
    ```bash
    npm run dev
    ```
4.  **Build for production**:
    ```bash
    npm run build
    ```

## Future Improvements
- Implement infinite scrolling instead of "Load More" button.
- Add user authentication.
- Enhance error handling and loading skeletons.
- Add unit tests for components and services.
