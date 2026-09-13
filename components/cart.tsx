'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Link from 'next/link';

const C = createContext<any>(null);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<any[]>([]);
  const [buyNowItem, setBuyNowItem] = useState<any>(null);
  const loaded = useRef(false);

  useEffect(() => {
    try {
      setItems(JSON.parse(localStorage.getItem('cart') || '[]'));
      setBuyNowItem(
        JSON.parse(localStorage.getItem('buyNowItem') || 'null')
      );
    } catch {}

    loaded.current = true;
  }, []);

  useEffect(() => {
    if (loaded.current) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items]);

  const add = (p: any) =>
    setItems((x) => {
      const f = x.find((i) => i.id === p.id);

      return f
        ? x.map((i) =>
            i.id === p.id
              ? { ...i, qty: Math.min(i.qty + 1, p.stock) }
              : i
          )
        : [
            ...x,
            {
              id: p.id,
              name: p.name,
              price: p.salePrice,
              image: p.image,
              images: p.images,
              qty: 1,
              stock: p.stock,
            },
          ];
    });

  const buyNow = (p: any) => {
    const item = {
      id: p.id,
      name: p.name,
      price: p.salePrice,
      image: p.image,
      images: p.images,
      qty: 1,
      stock: p.stock,
    };

    setBuyNowItem(item);
    localStorage.setItem('buyNowItem', JSON.stringify(item));
  };

  const clearBuyNow = () => {
    setBuyNowItem(null);
    localStorage.removeItem('buyNowItem');
  };

  const remove = (id: number) =>
    setItems((x) => x.filter((i) => i.id !== id));

  const update = (id: number, qty: number) =>
    setItems((x) =>
      x.map((i) =>
        i.id === id
          ? {
              ...i,
              qty: Math.max(1, Math.min(qty, i.stock)),
            }
          : i
      )
    );

  const total = useMemo(
    () => items.reduce((a, i) => a + i.price * i.qty, 0),
    [items]
  );

  return (
    <C.Provider
      value={{
        items,
        add,
        buyNow,
        buyNowItem,
        clearBuyNow,
        remove,
        update,
        total,
      }}
    >
      {children}
    </C.Provider>
  );
}

export const useCart = () => useContext(C);

export function CartButton() {
  const { items, total } = useCart();

  return (
    <Link
      className="cartBtn"
      href="/cart"
      aria-label="Shopping cart"
    >
      🛒 Cart ({items.length}) · ৳
      {total.toLocaleString('en-US')}
    </Link>
  );
}