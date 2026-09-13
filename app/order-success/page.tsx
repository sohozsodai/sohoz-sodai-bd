'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SuccessContent() {
  const q = useSearchParams();

  return (
    <main className="section narrow center">
      <div className="success">
        <div className="check">✓</div>

        <h1>অর্ডার সফল হয়েছে!</h1>

        <p>
          আপনার Order No: <b>{q.get('order')}</b>
        </p>

        <p>
          শিগগিরই আমাদের টিম আপনার সাথে যোগাযোগ করবে।
        </p>

        <Link href="/" className="primary">
          দোকানে ফিরে যান
        </Link>
      </div>
    </main>
  );
}

export default function Success() {
  return (
    <Suspense
      fallback={
        <main className="section narrow center">
          <div className="success">
            <p>লোড হচ্ছে...</p>
          </div>
        </main>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}