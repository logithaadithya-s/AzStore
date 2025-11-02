# AzStore - E-Commerce Website

A fully responsive, front-end-only e-commerce website built with React and Vite, fetching product data from the FakeStore API.

## Features

### Core Features
- **Homepage**: Hero section with featured products
- **Product Listing**: Browse all products with search, filtering by category and price range, and pagination
- **Product Detail**: Detailed product view with image, description, rating, and add to cart functionality
- **Shopping Cart**: Add/remove items, update quantities, and view cart total
- **Responsive Design**: Mobile-friendly design that works seamlessly across all devices

### Bonus Features
- **Dark Mode**: Toggle between light and dark themes
- **Admin Panel**: Access admin functionality at `/admin` with demo OAuth login (Google OAuth can be configured)
- **Animations**: Subtle Framer Motion animations throughout the site
- **Custom Loader**: Custom loading component for better perceived performance
- **Pagination**: Efficient product listing with pagination support

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Framer Motion** - Animation library
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first CSS framework (installed but using custom CSS)
- **@react-oauth/google** - Google OAuth integration for admin panel

## Project Structure

```
src/
├── assets/
│   └── components/
│       ├── Navbar.jsx         # Navigation bar with cart badge
│       └── Navbar.css
├── components/
│   ├── Loader.jsx             # Custom loading component
│   ├── Loader.css
│   ├── ProductCard.jsx        # Reusable product card component
│   └── ProductCard.css
├── context/
│   ├── CartContext.jsx        # Cart state management
│   ├── ThemeContext.jsx       # Dark mode theme management
│   └── AuthContext.jsx        # Admin authentication state
├── pages/
│   ├── Home.jsx               # Homepage with hero and featured products
│   ├── Home.css
│   ├── Products.jsx           # Product listing with filters
│   ├── Products.css
│   ├── ProductDetail.jsx      # Individual product page
│   ├── ProductDetail.css
│   ├── Cart.jsx               # Shopping cart page
│   ├── Cart.css
│   ├── Admin.jsx              # Admin panel
│   └── Admin.css
├── services/
│   └── api.js                 # FakeStore API integration
├── App.jsx                    # Main app component with routing
├── App.css
├── main.jsx                   # App entry point
└── index.css                  # Global styles and theme variables
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Configure Google OAuth for admin panel:
   - Create a `.env` file in the root directory
   - Add your Google Client ID:
     ```
     VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
     ```
   - If not configured, the admin panel will use a demo login button

## Running the Application

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:5173`

## API Integration

The application fetches data from the [FakeStore API](https://fakestoreapi.com/docs):
- `GET /products` - Get all products
- `GET /products/:id` - Get single product
- `GET /products/categories` - Get all categories
- `GET /products/category/:category` - Get products by category

## Features in Detail

### Homepage
- Hero section with call-to-action
- Featured products (top 4 by rating)
- Smooth animations on scroll

### Product Listing
- Search by product name or description
- Filter by category
- Filter by price range (min/max)
- Pagination (12 items per page)
- Responsive grid layout

### Product Detail
- Large product image
- Full description
- Rating and review count
- Quantity selector (1-10)
- Add to cart functionality

### Shopping Cart
- View all cart items
- Update item quantities
- Remove items
- Real-time total calculation
- Persistent cart (localStorage)

### Admin Panel
- Google OAuth authentication (or demo login)
- Add new products
- View all products
- Delete products
- Note: Product additions/deletions are stored locally (not persisted to FakeStore API)

### Dark Mode
- Toggle button in navbar
- Persistent theme preference (localStorage)
- Smooth theme transitions

## State Management

The application uses React Context API for state management:
- **CartContext**: Manages shopping cart state and operations
- **ThemeContext**: Manages dark/light theme state
- **AuthContext**: Manages admin authentication state

All contexts persist data to localStorage for better user experience.

## Responsive Design

The website is fully responsive with breakpoints:
- Desktop: Full layout with sidebar filters
- Tablet: Adjusted grid layouts
- Mobile: Single column layouts, hidden navigation items

## Browser Support

Modern browsers that support:
- ES6+ JavaScript features
- CSS Custom Properties (CSS Variables)
- Fetch API (via Axios)

## Notes

- This is a front-end-only application
- Cart and admin product changes are stored locally (localStorage)
- FakeStore API is read-only, so product additions in admin panel are local only
- Google OAuth is optional - demo login is available for testing

## Future Enhancements

- Backend integration for persistent cart and product management
- User authentication and accounts
- Checkout and payment integration
- Product reviews and ratings
- Wishlist functionality
- Order history
