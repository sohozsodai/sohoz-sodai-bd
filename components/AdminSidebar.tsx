'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminSidebar() {
  const router = useRouter();

  async function logout() {
    const ok = window.confirm('আপনি কি Logout করতে চান?');

    if (!ok) return;

    const res = await fetch('/api/auth/logout', {
      method: 'POST',
    });

    if (res.ok) {
      router.push('/admin/login');
      router.refresh();
    } else {
      alert('Logout করা যায়নি।');
    }
  }

  return (
    <aside className="sidebar">
      <div className="adminLogo">
        সহজ সদাই বিডি
        <small>Admin Panel</small>
      </div>

      <Link href="/admin">📊 Dashboard</Link>
      <Link href="/admin/products">🛍️ Products</Link>
      <Link href="/admin/categories">📂 Categories</Link>
      <Link href="/admin/banners">🖼️ Slider</Link>

      <Link href="/admin/orders">📦 Orders</Link>
      <Link href="/admin/orders/history">📜 Order History</Link>

      <Link href="/admin/customers">👥 Customers</Link>
      <Link href="/admin/delivery-areas">🚚 Delivery Area</Link>
      <Link href="/admin/settings">⚙️ Settings</Link>
      <Link href="/">↩️ দোকান দেখুন</Link>

      <button
        type="button"
        className="danger"
        onClick={logout}
        style={{ width: '100%', marginTop: '12px' }}
      >
        🚪 Logout
      </button>
    </aside>
  );
}