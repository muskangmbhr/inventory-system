# Inventory and Data Management System

A RESTful backend application developed using **Node.js, Express.js, MongoDB, and Mongoose** to manage product inventory, stock levels, and product information.

## 1. Project Overview

The Inventory and Data Management System is designed to help stores and warehouses manage their product catalogue efficiently.

The application provides APIs to create, retrieve, update, delete, search, and filter products. It also supports stock adjustments, low-stock alerts, and category-wise inventory reports.

This project is developed as part of **Web Dev III – Unit 3, Assignment 3**.

## 2. Objectives

- Design a Mongoose schema with field-level validation.
- Connect an Express.js application to MongoDB.
- Implement complete CRUD operations.
- Apply filtering, sorting, and pagination.
- Manage stock increments and decrements.
- Generate low-stock reports.
- Create category-wise inventory summaries using aggregation.
- Implement centralized error handling.
- Manage environment variables using dotenv.

## 3. Technology Stack

| Technology | Purpose |
|---|---|
| Node.js | Server-side JavaScript runtime |
| Express.js | Backend framework and routing |
| MongoDB | NoSQL database |
| Mongoose | Schema design and database operations |
| dotenv | Environment variable management |
| Postman | API testing |

## 4. Project Structure

```text
inventory-management/
│
├── config/
│   └── db.js
│
├── middleware/
│   └── errorHandler.js
│
├── models/
│   └── Product.js
│
├── routes/
│   └── productRoutes.js
│
├── screenshots/
│   ├── 01-project-structure.png
│   ├── 02-server-mongodb.png
│   ├── 03-get-products.png
│   ├── 04-create-product.png
│   ├── 05-category-filter.png
│   ├── 06-price-sorting.png
│   ├── 07-pagination.png
│   ├── 08-get-product-by-id.png
│   ├── 09-update-product.png
│   ├── 10-stock-adjustment.png
│   ├── 11-low-stock.png
│   ├── 12-category-summary.png
│   └── 13-delete-product.png
│
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md
```

## 5. Product Schema and Validation

The Product schema contains the following fields:

| Field | Data Type | Validation |
|---|---|---|
| name | String | Required |
| sku | String | Required and Unique |
| category | String | Required |
| price | Number | Required, Minimum 0 |
| quantity | Number | Required, Minimum 0, Default 0 |
| reorderLevel | Number | Required, Minimum 0, Default 10 |
| supplier | String | Required |

The schema also uses timestamps to automatically store creation and update dates.

## 6. Features

### Product Management
- Create new products.
- Retrieve all products.
- Retrieve a single product by ID.
- Update existing product details.
- Delete products.

### Filtering, Sorting and Pagination
- Filter products by category.
- Filter products using minimum and maximum prices.
- Sort products by price.
- Display products page by page using pagination.

### Stock Management
- Increase stock during restocking.
- Decrease stock during sales.
- Check available product quantities.

### Inventory Reports
- Generate low-stock alerts.
- Generate category-wise inventory summaries using MongoDB aggregation.

### Error Handling
- Centralized error-handling middleware.
- Handles duplicate SKU errors.
- Handles Mongoose validation errors.
- Handles invalid product IDs.

## 7. API Endpoints

**Base URL:**

```text
http://localhost:5000/api/products
```

| HTTP Method | Endpoint | Description |
|---|---|---|
| POST | `/` | Create a new product |
| GET | `/` | Retrieve all products |
| GET | `/low-stock` | Retrieve low-stock products |
| GET | `/summary` | Category-wise inventory summary |
| GET | `/:id` | Retrieve a product by ID |
| PUT | `/:id` | Update product details |
| DELETE | `/:id` | Delete a product |
| PATCH | `/:id/stock` | Adjust product stock |

## 8. Query Parameters

The GET all products endpoint supports:

| Parameter | Description |
|---|---|
| category | Filter by product category |
| minPrice | Set minimum product price |
| maxPrice | Set maximum product price |
| sort | Select the field for sorting |
| order | Sorting order: asc or desc |
| page | Select page number |
| limit | Set number of products per page |

**Example:**

```text
GET /api/products?category=Stationery&sort=price&order=asc&page=1&limit=5
```

## 9. API Testing Screenshots (Postman)

The following screenshots demonstrate the API requests and responses tested using Postman.

### 1. Project Structure
![Project Structure](screenshots/01-project-structure.png)

### 2. Server and MongoDB Connection
![Server and MongoDB](screenshots/02-server-mongodb.png)

### 3. Get All Products (GET)
![Get All Products](screenshots/03-get-products.png)

### 4. Create Product (POST)
![Create Product](screenshots/04-create-product.png)

### 5. Category Filtering (GET)
![Category Filtering](screenshots/05-category-filter.png)

### 6. Price Sorting (GET)
![Price Sorting](screenshots/06-price-sorting.png)

### 7. Pagination (GET)
![Pagination](screenshots/07-pagination.png)

### 8. Get Product by ID (GET)
![Get Product by ID](screenshots/08-get-product-by-id.png)

### 9. Update Product (PUT)
![Update Product](screenshots/09-update-product.png)

### 10. Stock Adjustment (PATCH)
![Stock Adjustment](screenshots/10-stock-adjustment.png)

### 11. Low-Stock Report (GET)
![Low Stock Report](screenshots/11-low-stock.png)

### 12. Category-wise Inventory Summary (GET)
![Category Summary](screenshots/12-category-summary.png)

### 13. Delete Product (DELETE)
![Delete Product](screenshots/13-delete-product.png)

## 10. Installation and Setup

### Step 1: Open the Project

Open the project folder in Visual Studio Code.

### Step 2: Install Dependencies

Run the following command in the terminal:

```bash
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/inventoryDB
```

Make sure MongoDB is installed and running.

### Step 4: Start the Application

For development:

```bash
npm run dev
```

For normal execution:

```bash
npm start
```

### Step 5: Test the Application

Open Postman and enter:

```text
http://localhost:5000
```

Expected response:

```text
Inventory Management System API is Running
```

## 11. Error Handling

The application uses centralized error-handling middleware to manage:

- Duplicate SKU errors.
- Required-field validation errors.
- Invalid MongoDB IDs.
- Other server errors.

## 12. Learning Outcomes

Through this assignment, I learned:

- How to create a backend application using Node.js and Express.js.
- How to connect MongoDB using Mongoose.
- How to design and validate database schemas.
- How to implement RESTful CRUD operations.
- How to use filtering, sorting, and pagination.
- How to manage product stock.
- How to generate reports using aggregation pipelines.
- How to handle errors using middleware.
- How to test APIs using Postman.

## 13. Conclusion

The Inventory and Data Management System demonstrates the practical implementation of backend development concepts using Node.js, Express.js, MongoDB, and Mongoose.

It provides an organised way to manage products, maintain stock levels, and generate inventory reports through RESTful APIs.

---
