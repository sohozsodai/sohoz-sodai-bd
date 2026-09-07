# সহজ সদাই বিডি — Full E-commerce v3

পূর্ণাঙ্গ local e-commerce starter: public shop + admin panel + product/category management + slider + cart + checkout + order + invoice + customers + delivery area + settings.

## Windows setup
1. `.env.example` কপি করে `.env` করুন।
2. ADMIN_PASSWORD এবং AUTH_SECRET নিজের private value দিন।
3. চালান:
   npm install
   npx prisma db push
   npm run db:seed
   npm run dev
4. Store: http://localhost:3000
5. Admin: http://localhost:3000/admin/login

## Included
- Homepage slider CRUD + image upload
- Logo/banner upload
- Product Add/Edit/Delete, multiple images, stock, SKU, category/subcategory, color, size, variants, featured/offer, active/inactive
- Website/admin product search & filters
- Category/Sub-category CRUD
- Cart + Checkout + customer data + delivery area/charge + COD/bKash/Nagad
- Admin orders + statuses: Pending/Confirmed/Processing/Delivered/Cancelled
- Printable invoice / Save as PDF through browser print
- Dashboard sales/order/customer/product counts + low-stock overview + recent orders
- Customer management + order history
- Store settings + editable homepage text/contact/payment/social data
- Responsive layout

Note: `/api/upload` stores images in `public/uploads` on the local server. For production hosting, use persistent/cloud image storage.
