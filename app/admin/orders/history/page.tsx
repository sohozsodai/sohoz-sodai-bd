'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { money } from '@/lib/data';

export default function OrderHistory() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadOrders() {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();

      const list = Array.isArray(data) ? data : data.orders || [];

      setOrders(
        list.filter(
          (o: any) =>
            o.status === 'DELIVERED' || o.status === 'CANCELLED'
        )
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function deleteOrder(id: number, orderNo: string) {
    const ok = window.confirm(
      `আপনি কি সত্যিই ${orderNo} অর্ডারটি স্থায়ীভাবে Delete করতে চান?\n\nএই কাজটি Undo করা যাবে না।`
    );

    if (!ok) return;

    const res = await fetch(`/api/orders/${id}/delete`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setOrders((items) => items.filter((o) => o.id !== id));
      alert('অর্ডারটি Delete করা হয়েছে।');
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.error || 'অর্ডার Delete করা যায়নি।');
    }
  }

  return (
    <>
      <div className="adminTop">
        <div>
          <h1>Order History</h1>
          <p>
            Delivered এবং Cancelled অর্ডারের ইতিহাস এখানে থাকবে।
          </p>
        </div>

        <div className="actions">
          <Link className="secondary" href="/admin/orders">
            Active Orders
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="empty">লোড হচ্ছে...</div>
      ) : (
        <>
          <div className="tableWrap">
            <table>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td>
                      <b>{o.orderNo}</b>
                      <small>
                        {new Date(o.createdAt).toLocaleString('bn-BD')}
                      </small>
                    </td>

                    <td>{o.customer?.name}</td>

                    <td>{o.customer?.phone}</td>

                    <td>{money(o.total)}</td>

                    <td>
                      <span className="pill">{o.status}</span>
                    </td>

                    <td>
                      <div className="actions">
                        <Link
                          className="secondary"
                          href={'/admin/orders/' + o.id}
                        >
                          View
                        </Link>

                        <button
                          type="button"
                          className="danger"
                          onClick={() =>
                            deleteOrder(o.id, o.orderNo)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {orders.length === 0 ? (
            <div className="empty">
              এখনো কোনো Delivered বা Cancelled অর্ডার নেই।
            </div>
          ) : null}
        </>
      )}
    </>
  );
}