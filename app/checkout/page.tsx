'use client';

import { useCart } from '@/components/cart';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { money } from '@/lib/data';

function Form() {
  const { items, buyNowItem, clearBuyNow } = useCart();
  const r = useRouter();

  const checkoutItems = buyNowItem ? [buyNowItem] : items;

  const checkoutTotal = checkoutItems.reduce(
    (sum: number, item: any) =>
      sum + Number(item.price) * Number(item.qty),
    0
  );

  const [areas, setAreas] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({});

  const [f, setF] = useState<any>({
    name: '',
    phone: '',
    email: '',
    address: '',
    deliveryAreaId: '',
    paymentMethod: 'COD',
    paymentRef: '',
    note: '',
  });

  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch('/api/delivery-areas').then((x) => x.json()),
      fetch('/api/settings').then((x) => x.json()),
    ]).then(([a, s]) => {
      const active = a.filter((x: any) => x.active);
      setAreas(active);
      setSettings(s);

      if (active[0]) {
        setF((v: any) => ({
          ...v,
          deliveryAreaId: String(active[0].id),
        }));
      }
    });
  }, []);

  if (!checkoutItems.length) {
    return (
      <main className="section narrow">
        <h1>Checkout</h1>
        <p>কার্ট খালি।</p>
      </main>
    );
  }

  const area = areas.find(
    (x) => String(x.id) === String(f.deliveryAreaId)
  );

  const fee = area
    ? Number(area.charge)
    : Number(settings.deliveryCharge || 0);

  async function submit(e: any) {
    e.preventDefault();
    setMsg('');

    const phone = String(f.phone).trim();
    const address = String(f.address).trim();

    // বাংলাদেশি মোবাইল নম্বর:
    // 01 + 9টি সংখ্যা = মোট 11 সংখ্যা
    const bdPhone = /^01[3-9]\d{8}$/;

    if (!bdPhone.test(phone)) {
      setMsg(
        'সঠিক বাংলাদেশি মোবাইল নম্বর দিন। উদাহরণ: 01712345678'
      );
      return;
    }

    if (!address) {
      setMsg('ডেলিভারি ঠিকানা অবশ্যই দিতে হবে।');
      return;
    }

    if (!f.deliveryAreaId) {
      setMsg('ডেলিভারি এলাকা নির্বাচন করুন।');
      return;
    }

    setLoading(true);

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...f,
        phone,
        address,
        items: checkoutItems,
      }),
    });

    const data = await res.json();

    setLoading(false);

    if (!res.ok) {
      setMsg(data.error || 'অর্ডার হয়নি');
      return;
    }

    if (buyNowItem) {
      clearBuyNow();
    } else {
      localStorage.removeItem('cart');
    }

    r.push('/order-success?order=' + data.orderNo);
  }

  return (
    <main className="section narrow">
      <h1>অর্ডার সম্পন্ন করুন</h1>

      <form className="form" onSubmit={submit}>
        <div className="formGrid">
          <label>
            নাম
            <input
              required
              value={f.name}
              onChange={(e) =>
                setF({ ...f, name: e.target.value })
              }
            />
          </label>

          <label>
            মোবাইল নম্বর *
            <input
              required
              type="tel"
              inputMode="numeric"
              maxLength={11}
              placeholder="01712345678"
              value={f.phone}
              onChange={(e) =>
                setF({
                  ...f,
                  phone: e.target.value.replace(/\D/g, '').slice(0, 11),
                })
              }
            />
          </label>

          <label>
            Email (optional)
            <input
              type="email"
              value={f.email}
              onChange={(e) =>
                setF({ ...f, email: e.target.value })
              }
            />
          </label>

          <label>
            Delivery Area
            <select
              required
              value={f.deliveryAreaId}
              onChange={(e) =>
                setF({
                  ...f,
                  deliveryAreaId: e.target.value,
                })
              }
            >
              {areas.map((a) => (
                <option value={a.id} key={a.id}>
                  {a.name} — {money(a.charge)}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label>
          Delivery Address *
          <textarea
            required
            minLength={5}
            placeholder="সম্পূর্ণ ডেলিভারি ঠিকানা লিখুন"
            value={f.address}
            onChange={(e) =>
              setF({ ...f, address: e.target.value })
            }
          />
        </label>

        <label>
          Payment Method
          <select
            value={f.paymentMethod}
            onChange={(e) =>
              setF({
                ...f,
                paymentMethod: e.target.value,
              })
            }
          >
            <option value="COD">Cash on Delivery</option>
            <option value="bKash">
              bKash — {settings.bkash}
            </option>
            <option value="Nagad">
              Nagad — {settings.nagad}
            </option>
          </select>
        </label>

        {f.paymentMethod !== 'COD' ? (
          <div className="paymentNotice">
            <b>{f.paymentMethod} Payment</b>

            <p>
              {f.paymentMethod === 'bKash'
                ? settings.bkash
                : settings.nagad}{' '}
              নম্বরে payment করে Transaction ID দিন।
            </p>

            <label>
              Transaction/Reference
              <input
                required
                value={f.paymentRef}
                onChange={(e) =>
                  setF({
                    ...f,
                    paymentRef: e.target.value,
                  })
                }
              />
            </label>
          </div>
        ) : null}

        <label>
          নোট
          <textarea
            value={f.note}
            onChange={(e) =>
              setF({ ...f, note: e.target.value })
            }
          />
        </label>

        <div className="checkoutSummary">
          <p>
            <span>পণ্যের মূল্য</span>
            <b>{money(checkoutTotal)}</b>
          </p>

          <p>
            <span>Delivery Charge</span>
            <b>{money(fee)}</b>
          </p>

          <p className="grand">
            <span>মোট</span>
            <b>{money(checkoutTotal + fee)}</b>
          </p>
        </div>

        {msg ? <div className="error">{msg}</div> : null}

        <button
          className="primary full"
          disabled={loading}
        >
          {loading
            ? 'অর্ডার হচ্ছে...'
            : 'অর্ডার কনফার্ম করুন'}
        </button>
      </form>
    </main>
  );
}

export default function Checkout() {
  return <Form />;
}