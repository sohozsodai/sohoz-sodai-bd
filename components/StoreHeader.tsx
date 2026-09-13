 'use client';
import Link from 'next/link';
import {useState} from 'react';
import {CartButton} from './cart';

export default function StoreHeader({settings}:{settings?:any}){
  const [s]=useState<any>(settings||{storeName:'সহজ সদাই বিডি',logo:null});
  return <header className="header">
    <Link href="/" className="brand">{s.logo?<img src={s.logo} alt="logo" width={48} height={48}/>:null}<span>{s.storeName}</span></Link>
    <nav><Link href="/">হোম</Link><Link href="/#products">দোকান</Link><Link href="/contact">যোগাযোগ</Link><CartButton/></nav>
  </header>
}
