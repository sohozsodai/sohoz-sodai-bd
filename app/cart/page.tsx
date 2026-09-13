'use client';

import { useCart } from '@/components/cart';
import Link from 'next/link';
import { money } from '@/lib/data';
import { useRouter } from 'next/navigation';

type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  stock: number;
  image?: string;
};

function Inner() {
  const { items, remove, update, total } = useCart();
  const r = useRouter();

  return (
    <main className="section narrow">
      <h1>আপনার কার্ট</h1>

      {items.length === 0 ? (
        <div className="empty">
          কার্ট খালি। <Link href="/">পণ্য দেখুন</Link>
        </div>
      ) : (
        <>
          <div className="cartList">
            {items.map((i: CartItem) => (
              <div className="cartRow" key={i.id}>
                {i.image ? (
                  <img src={i.image} alt={i.name} />
                ) : (
                  <div className="miniPlaceholder" />
                )}

                <div className="grow">
                  <b>{i.name}</b>
                  <div>{money(i.price)}</div>
                </div>

                <input
                  type="number"
                  min="1"
                  max={i.stock}
                  value={i.qty}
                  onChange={(e) =>
                    update(i.id, Number(e.target.value))
                  }
                />

                <b>{money(i.price * i.qty)}</b>

                <button onClick={() => remove(i.id)}>
                  মুছুন
                </button>
              </div>
            ))}
          </div>

          <div className="summary">
            <span>মোট</span>
            <strong>{money(total)}</strong>
          </div>

          <button
            className="primary full"
            onClick={() => r.push('/checkout')}
          >
            Checkout
          </button>
        </>
      )}
    </main>
  );
}

export default function Cart() {
  return <Inner />;
}