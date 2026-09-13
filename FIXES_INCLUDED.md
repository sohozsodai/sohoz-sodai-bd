# SOHOZ sodai BD - fixes included

This build addresses the reported customer/admin issues:
- Persistent production image upload via Vercel Blob, with local development fallback.
- Product main image and multiple-image upload support.
- Logo and banner upload support using the same persistent storage.
- Direct "এখনই অর্ডার" flow from product cards/details.
- Cart moved into the top-right header.
- Phone/WhatsApp removed from the top bar and moved to footer.
- Prices now use English digits.
- Removed an extra client-side settings request from the public header.
- Improved cart localStorage initialization so a saved cart is not overwritten on first load.
- Added lazy loading for product card images.
- PostgreSQL is now the Prisma datasource for the deployed production database.
- Upload endpoint requires an authenticated admin session.

IMPORTANT:
- Vercel Blob must be connected to the Vercel project before production uploads can work.
- Existing database image URLs such as /uploads/... from the old local filesystem need to be re-uploaded from Admin after Blob is configured; those old local files are not present on Vercel.
- This source archive does not contain .env, .env.production, node_modules, .next, or dev.db.
