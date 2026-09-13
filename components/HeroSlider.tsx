'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HeroSlider({
  banners,
  fallback,
}: {
  banners: any[];
  fallback: any;
}) {
  const active = banners.filter((x: any) => x.active);
  const [i, setI] = useState(0);

  useEffect(() => {
    if (active.length < 2) return;

    const t = setInterval(() => {
      setI((x) => (x + 1) % active.length);
    }, 5000);

    return () => clearInterval(t);
  }, [active.length]);

  const b = active[i];

  if (!b) {
    return (
      <section className="hero">
        <div className="heroContent">
          <span className="eyebrow light">{fallback.heroBadge}</span>
          <h1>{fallback.heroTitle}</h1>
          <p>{fallback.heroText}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="slider">
      <img
        src={b.image}
        alt={b.title || 'SOHOZ sodai BD banner'}
        className="sliderImage"
      />

      <div className="sliderOverlay" />

      <div className="sliderContent">
        <span className="eyebrow light">{fallback.heroBadge}</span>

        <h1>{b.title}</h1>

        <p>{b.subtitle}</p>

        <Link
          className="primary"
          href={b.buttonLink || '/#products'}
        >
          {b.buttonText || 'পণ্য দেখুন'}
        </Link>
      </div>

      {active.length > 1 ? (
        <div className="dots">
          {active.map((_: any, n: number) => (
            <button
              key={n}
              aria-label={`slide ${n + 1}`}
              className={n === i ? 'on' : ''}
              onClick={() => setI(n)}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}