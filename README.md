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


## Production image storage
This version uses Vercel Blob for persistent product/logo/banner images when `BLOB_READ_WRITE_TOKEN` is configured. Without that variable, local development falls back to `public/uploads`, which is not persistent on Vercel.

Before deploying:
1. In Vercel, create/connect a Blob store for this project.
2. Add the generated `BLOB_READ_WRITE_TOKEN` as a Production environment variable.
3. Run `npm install`.
4. Run `npx prisma db push` only if the target database schema needs syncing.
5. Run `npm run build`.
6. Deploy with `vercel deploy --prod --yes`.
7. Re-upload existing product/logo/banner images that previously used `/uploads/...`; old local filesystem URLs cannot be recovered by Vercel.
