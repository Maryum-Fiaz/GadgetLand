# GadgetLand

An electronics e-commerce store built to buy and sell premium tech products. This full-stack application handles the complete user shopping journey, advanced search filters, secure checkout options, a dynamic admin analytics dashboard, and an AI-powered shopping assistant.

---

## Features Built In

* **AI Shopping Assistant (GLand Assistant):** Integrated Google Gemini LLM assistant that dynamically pulls MongoDB inventory to answer customer inquiries, recommend products, and handle store policy FAQs in real time.
* **Dual Payment Flows:** Supports online credit card payments via **Stripe Checkout API** alongside a separate manual **Cash on Delivery (COD)** order processing logic.
* **Database Aggregations:** Uses MongoDB aggregation pipelines to calculate sales data and top-selling shop items dynamically.
* **Global State & Caching:** Uses **Redux Toolkit** and **RTK Query** to manage the global client state, handle the shopping cart, and cache backend data efficiently.
* **Security & Auth:** Secures user registration, login profiles, and admin dashboard tabs using **JWT (JSON Web Tokens)** and custom protected route middleware.
* **Analytics Visualization:** Uses dual-axis charts via **Recharts** inside the admin dashboard to track revenue, stock, and order trends visually.

---

## Tech Stack

* **Frontend:** React, Tailwind CSS, Recharts, Framer Motion, Lucide Icons
* **State Management:** Redux Toolkit & RTK Query
* **Backend:** Node.js & Express.js (REST API)
* **Database:** MongoDB with Mongoose ODM
* **AI Integration:** Google Generative AI SDK (`gemini-3.1-flash-lite`)
* **Payments & Media:** Stripe API, Cloudinary API

---

## Project Structure

```text
GADGETLAND/
├── backend/    # REST API endpoints, controllers, MongoDB models, and config.env
└── frontend/   # React UI source code, RTK Query state hooks, and components