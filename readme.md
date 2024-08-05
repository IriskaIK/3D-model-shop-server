# "3D models shop" server

This project is an Express RESTful server written in TypeScript, designed to power an online shop specializing in 3D
models. The server provides management of products, user accounts, orders, and other essential features for an online 3D
model store.

## Key features include:

- User Authorization: Secure user authentication and authorization mechanisms.
- Product Requests: Endpoints for serving product requests with filtering capabilities.
- Cart Management: Endpoints for managing user shopping carts.
- Wishlist Functionality: Support for adding and managing products in user wishlists.
- Order Handling: Comprehensive order processing and management.

## Technology Stack

- TypeScript: Provides type safety and just make life easier.
- Passport.js: Used for authentication middleware
- Objection.js: used for interacting with the PostgreSQL database.
- Knex.js: SQL query builder for PostgreSQL, used in conjunction with Objection.js for database operations.
- PostgreSQL: Relational database management system for storing application data.
- MongoDB: Used specifically for session storage, leveraging its NoSQL capabilities for efficient session management.

# API Reference

## Auth

#### Log In

```http
  POST /api/auth/login
```

Request

| Body parameter | Type     | Description   |
|:---------------|:---------|:--------------|
| `password`     | `string` | **Required**. |
| `email`        | `string` | **Required**. |

#### Sign In

```http
  POST /api/auth/register
```

Request

| Body parameter | Type     | Description   |
|:---------------|:---------|:--------------|
| `password`     | `string` | **Required**. |
| `email`        | `string` | **Required**. |
| `first_name`   | `string` | **Required**. |

#### Log Out

```http
  GET /api/auth/logout
```

## Account management

#### Get account details

```http
  Get /api/account
```

Response

```ts
interface Response {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    shipping_address: ShippingAddress;
    avatar: Image;
    cart: Product[];
    wishlist: Product[];
}
```

#### Update account details

```http
  PUT /api/account
```

Request

| Body parameter | Type     | Description   |
|:---------------|:---------|:--------------|
| `firstName`   | `string` | **Required**. |
| `lastName`    | `string` | **Required**. |
| `phoneNumber`        | `string` | **Required**. |
| `email`        | `string` | **Required**. |

Response

```ts
interface Response {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    shipping_address: ShippingAddress;
    avatar: Image;
    cart: Product[];
    wishlist: Product[];
}
```

## Account delivery address management

#### Account delivery address details

```http
  GET /api/account/delivery
```

Response

```ts
interface Response {
    id: number;
    region: string;
    city: string;
    postOffice: string;
}
```

#### Update account delivery address details

```http
  PUT /api/account/delivery
```

Request

| Body parameter | Type     | Description   |
|:---------------|:---------|:--------------|
| `region`       | `string` | **Required**. |
| `city`         | `string` | **Required**. |
| `postOffice`   | `string` | **Required**. |

## Account cart management

#### Add product to cart

```http
  GET /api/account/cart/add/:id
```

Request

| Route params | Type     | Description               |
|:-------------|:---------|:--------------------------|
| `id`         | `string` | Product id. **Required**. |

#### Update item quantity in cart

```http
  PUT /api/account/cart/
```

Request

| Body parameter | Type     | Description                         |
|:---------------|:---------|:------------------------------------|
| `id`           | `string` | Product id. **Required**.           |
| `quantity`     | `string` | New quantity of item. **Required**. |

#### Get item quantity in cart

```http
  GET /api/account/cart/:id
```

Request

| Route params | Type     | Description               |
|:-------------|:---------|:--------------------------|
| `id`         | `string` | Product id. **Required**. |

Response

```ts
interface Response {
    quantity: number;
}
```

#### Get items in cart

```http
  GET /api/account/cart/
```

Response[]

```ts
interface Response {
    publicId: string;
    title: string;
    subtitle: string;
    content: string;
    price: number;
    currency: string;
    isInStock: boolean;
    category: Category;
    tags: Tag[];
    images: Image[]
}
```

#### Remove item from cart

```http
  DELETE /api/account/cart/:id
```

Request

| Route params | Type     | Description               |
|:-------------|:---------|:--------------------------|
| `id`         | `string` | Product id. **Required**. |

## Account wishlist management

#### Add product to wishlist

```http
  GET /api/account/wishlist/:id
```

Request

| Route params | Type     | Description               |
|:-------------|:---------|:--------------------------|
| `id`         | `string` | Product id. **Required**. |

#### Get items in wishlist

```http
  GET /api/account/wishlist/
```

Response[]

```ts
interface Response {
    publicId: string;
    title: string;
    subtitle: string;
    content: string;
    price: number;
    currency: string;
    isInStock: boolean;
    category: Category;
    tags: Tag[];
    images: Image[]
}
```

#### Remove item from wishlist

```http
  DELETE /api/account/cart/:id
```

Request

| Route params | Type     | Description               |
|:-------------|:---------|:--------------------------|
| `id`         | `string` | Product id. **Required**. |

## Account orders management

#### Add order

```http
  POST /api/account/orders
```

Request

| Body params | Type     | Description   |
|:------------|:---------|:--------------|
| `{*}`       | `object` | **Required**. |

```ts
interface Request {
    recipient: {
        first_name: string,
        last_name: string,
        phone: string,
    },
    shipping_address: {
        region: string,
        city: string,
        postOffice: string,
    }
}
```

#### Get orders

```http
  GET /api/account/orders/
```

Response[]

```ts
interface Response {
    status: string,
    created_at: string,
    updated_at: string,
    shipping_address: Partial<ShippingAddress>,
    recipient: Partial<Recipient>,
    orderItems: Partial<ProductSnapshot>[],
}
```

## Products

#### Get products with filters

```http
  POST /api/products/
```

Request

| Body params | Type                   | Description   |
|:------------|:-----------------------|:--------------|
| `offset`    | `int`                  | **Optional**. |
| `inStock`   | `boolean`              | **Optional**. |
| `price`     | `{min: int, max  int}` | **Optional**. |
| `orderBy`   | `string*`              | **Optional**. |
| `category`  | `string[]`             | **Optional**. |
| `tags`      | `string[]`             | **Optional**. |

`orderBy = "high price" | "low price" | "name" | "date"`

Response[]

```ts
interface Response {
    products: Product[];
    offset: number;
}
```

#### Get product by id

Request

```http
  GET /api/products/product/:id
```

| Route params | Type     | Description               |
|:-------------|:---------|:--------------------------|
| `id`         | `string` | Product id. **Required**. |

Response

```ts
interface Response {
    publicId: string;
    title: string;
    subtitle: string;
    content: string;
    price: number;
    currency: string;
    isInStock: boolean;
    category: Category;
    tags: Tag[];
    images: Image[]
}
```

#### Get tags

```http
  GET /api/products/product/tags
```

Response[]

```ts
interface Response {
    publicId: string;
    title: string;
}
```

#### Get categories

```http
  GET /api/products/product/categories
```
Response[]
```ts
interface Response {
    publicId: string;
    title: string;
    content: string;
    images: Image;
}
```















