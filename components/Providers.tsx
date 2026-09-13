'use client';

import { CartProvider } from './cart';

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CartProvider>{children}</CartProvider>;
}