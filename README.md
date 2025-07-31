# 🍱 Foodoor

A fullstack food delivery showcase app built with Next.js, TypeScript, Tailwind, Supabase, and Auth.js (Google OAuth). This project was created as a personal milestone in learning fullstack development with modern tools and patterns.

## 🚀 Tech Stack & Tools

- **Framework**: Next.js (App Router, Server Actions, SSR)
- **Language**: TypeScript
- **Database & Auth**: Supabase
- **Authentication**: Auth.js (Google sign-in)
- **Styling**: Tailwind CSS
- **State/Data**: Server-side rendering
- **Persistence**: Supabase DB, cookies (for guest flows)
- **UX Enhancements**: Suspense (streaming), route middleware, error boundaries

## 🔍 Features Overview

- 🔐 **Authentication** via Google or as guest (cookie-based cart)
- 🛒 **Cart & Orders** for both logged-in and guest users
- 📦 **Order History & Delivery Details** for authenticated users
- 🍽️ **Restaurant & Product Listings** with responsive filtering
- 🎯 **Server Actions & Server-side Filtering** for performance
- 🧱 **Dynamic Routing**: Nested layouts and route segments
- 🚦 **Route Middleware** to protect pages like `/logs`, `/account`
- 💥 **Fallbacks**: `loading.js`, `error.js`, `not-found.js` implemented across routes

## 🧭 Learning Objectives

This project helped me:

- Build a realistic fullstack app with modern Next.js conventions
- Deepen my understanding of SSR, Server Actions, and Suspense
- Handle complex authentication flows (guest + OAuth)
- Implement route-level protection with middleware
- Design a responsive and accessible UI with Tailwind
- Use Supabase to store structured relational data (restaurants, products, cart, logs)

## 📂 Project Structure Highlights

- src/app/ // App Router structure (routes, layouts, loading)
- src/components/ // Reusable UI components (Cart, Sidebar, Logo)
- src/lib/ // Supabase client, auth utils
- app/api/ // Server Actions, queries, and DB operations
- src/middleware.ts // Route protection middleware
- src/types/ // TypeScript types
- src/contexts/ // Global context for Light and Dark theme control
- src/utils/ // Helpers (identifiers, filters, computing functions)

## 🧪 Example Flow

- 👤 **User visits site** → can browse as guest or sign in with Google
- 🍔 **Adds products to cart** → cart persists via cookie or user ID
- 📦 **Proceeds to checkout** → order placed (the logs are computed for logged users)
- 📜 **Logged-in users** can edit delivery info and view order history

## 📱 Responsive Design

Foodoor is optimized for all major breakpoints:

- 📱 **Old phones** (<380px)
- 📱 **Modern phones** (≥380px)
- 💻 **Tablets & small laptops**
- 🖥️ **Desktops & wide screens**

Tailwind's utility-first approach combined with responsive design ensures usability across all viewports.

## 🙋‍♂️ Why I Built This

This app represents my push toward fullstack development. I’ve built it to:

- Showcase what I’ve learned so far in web development
- Explore real-world fullstack patterns with cutting-edge tools
- Demonstrate motivation, curiosity, and attention to detail
- Open doors to job opportunities, internships, or collaborations

I'm passionate about modern web technologies and love building meaningful apps. This project is one step in my journey to becoming a confident and skilled fullstack developer.

## 📌 Notes

- ❌ This app does not handle real payments or physical delivery.
- 📦 Orders are simulated and used as a learning mechanism.

## 📬 Contact

Feel free to reach out if you’re looking for a junior dev with hands-on experience in:

- React, TypeScript, Next.js (App Router)
- Supabase and fullstack integration
- Clean UI/UX with Tailwind
- Real-world authentication & cart logic

Email: [mariandobre002@gmail.com]  
LinkedIn: [https://www.linkedin.com/in/marian-dobre-/]

Thanks for reading — and thank you for considering my work 🙌
