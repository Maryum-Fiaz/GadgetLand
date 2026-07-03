# GadgetLand

An electronics e-commerce store built to buy and sell premium tech products. This full-stack application handles the complete user shopping journey, advanced search filters, secure checkout options, and a dynamic admin analytics dashboard.

---

## Features Built In

* **Dual Payment Flows:** Supports online credit card payments via **Stripe Checkout API** alongside a separate manual **Cash on Delivery (COD)** order processing logic.
* **Database Aggregations:** Uses MongoDB aggregation pipelines to calculate sales data and top-selling shop items dynamically.
* **Global State & Caching:** Uses **Redux Toolkit** and **RTK Query** to manage the global client state, handle the shopping cart values, and cache backend data efficiently to stop extra API calls.
* **Security & Auth:** Secures user registration, login profiles, and special admin dashboard tabs using **JWT (JSON Web Tokens)** and custom protected route middlewares.
* **Error Handling & Visualization:** Implements global frontend/backend error handling, different for production and development. 
* **Recharts:** uses dual-axis charts inside the dashboard to track store data visually for business analytics.

---

## Tech Stack

* **Frontend:** React, Tailwind CSS, Recharts, Framer Motion, Lucide Icons
* **State Management:** Redux Toolkit & RTK Query
* **Backend:** Node.js & Express.js (REST API)
* **Database:** MongoDB with Mongoose ODM
* **Payments:** Stripe API (With secure webhook handler)

---

## Project Structure

When you clone this repository, you are already inside the main root folder 'GADGETLAND'. The backend and frontend are separated into distinct directories:
* `backend/` — Holds the server, aggregation pipelines, models, and your `config.env` configurations.
* `frontend/` — Holds the React layout source code, states, components, and packages.