# RockAI Task - E-commerce Product Management

Deployed at: https://ecomex-nine.vercel.app/

A modern e-commerce product management system built with Next.js, MongoDB, and TypeScript. This application provides a clean interface for managing products with full CRUD operations and shopping cart functionality.

## GitHub Repository

🔗 **[Full Project Code](https://github.com/amr-essayyed/ecomex)**

## Project Overview

This is a full-stack e-commerce application featuring:

- Product catalog with search and filtering
- Shopping cart functionality with persistent state
- RESTful API for product management
- Modern UI with Tailwind CSS and Radix UI components
- MongoDB integration with Mongoose ODM
- TypeScript for type safety
- Zod schema validation

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB instance
- Git

### Environment Setup

1. **Clone the repository:**

```bash
git clone https://github.com/[your-username]/rockai_task.git
cd rockai_task
```

2. **Install dependencies:**

```bash
npm install
```

3. **Environment Configuration:**
   Create a `.env` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your actual MongoDB connection string.

### Running the Application

1. **Development server:**

```bash
npm run dev
```

2. **Production build:**

```bash
npm run build
npm start
```

3. **Linting:**

```bash
npm run lint
```

The application will be available at [https://ecomex-nine.vercel.app/](https://ecomex-nine.vercel.app/)

### Initial Data Setup

To populate the database with sample products:

1. Start the development server
2. Navigate to `http://localhost:3000/api/seed`
3. This will create 100 sample products in your database

## API Testing

### Available Endpoints

#### Products API

- **GET** `/api/products` - Fetch all products
- **POST** `/api/products` - Create a new product
- **GET** `/api/products/[productId]` - Get specific product
- **PUT** `/api/products/[productId]` - Update product
- **DELETE** `/api/products/[productId]` - Delete product

#### Seed API

- **GET** `/api/seed` - Populate database with sample data

### Testing with Postman

#### 1. Get All Products

```
GET http://localhost:3000/api/products
```

#### 2. Create New Product

```
POST http://localhost:3000/api/products
Content-Type: application/json

{
  "title": "iPhone 15 Pro",
  "description": "Latest iPhone with advanced features",
  "price": 999.99,
  "category": "Electronics",
  "imageUrl": "https://example.com/iphone15.jpg"
}
```

#### 3. Get Specific Product

```
GET http://localhost:3000/api/products/[product-id]
```

#### 4. Update Product

```
PUT http://localhost:3000/api/products/[product-id]
Content-Type: application/json

{
  "title": "Updated Product Name",
  "price": 899.99
}
```

#### 5. Delete Product

```
DELETE http://localhost:3000/api/products/[product-id]
```

### Testing via Frontend

1. **Browse Products:** Visit the homepage to view all products
2. **Add to Cart:** Click "Add to Cart" on any product
3. **View Cart:** Check the cart icon in the header
4. **Search/Filter:** Use the search functionality to find specific products

## Technical Decisions

### State Management

- **Local Storage Persistence:** Cart state persists across browser sessions
- **Optimistic Updates:** Immediate UI feedback with error handling fallbacks

### API Architecture

- **RESTful Design:** Clean REST endpoints following standard conventions
- **Zod Validation:** Schema validation for all API inputs ensuring data integrity
- **Error Handling:** Comprehensive error handling with meaningful error messages
- **MongoDB Integration:** Mongoose ODM for robust database operations with schema validation

### Frontend Architecture

- **App Router:** Next.js 15 App Router for modern routing and server components
- **Component Composition:** Reusable UI components with Radix UI primitives
- **TypeScript:** Full type safety across the application
- **Tailwind CSS:** Utility-first styling with custom design system

### Performance Optimizations

- **Server Components:** Leveraging Next.js server components for better performance
- **Image Optimization:** Next.js built-in image optimization
- **Code Splitting:** Automatic code splitting with Next.js

### Development Experience

- **ESLint:** Code quality and consistency
- **TypeScript:** Type safety and better developer experience
- **Hot Reload:** Fast development with Next.js hot reload

## Project Structure

```
src/
├── app/
│   ├── api/           # API routes
│   ├── (ecomex)/      # Main application pages
│   └── globals.css    # Global styles
├── components/        # Reusable UI components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and configurations
└── model/            # Database models and schemas
```

## Technologies Used

- **Frontend:** Next.js 15, React 19, TypeScript
- **Styling:** Tailwind CSS, Radix UI
- **Backend:** Next.js API Routes, MongoDB, Mongoose
- **Validation:** Zod
- **State Management:** React Context API
- **Development:** ESLint, Faker.js for seed data
