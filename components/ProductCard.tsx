 'use client';
import Link from 'next/link';
import {money,arr} from '@/lib/data';
import {useCart} from './cart';
import {useRouter} from 'next/navigation';

export default function ProductCard({p}:{p:any}){
  const {add,buyNow}=useCart();
  const router=useRouter();
  const imgs=arr(p.images);
  const image=p.image||imgs[0];

  function directOrder(){
    if(!p.active||p.stock<1)return;
    buyNow(p);
    router.push('/checkout');
  }

  return <article className="productCard">
    <Link href={'/product/'+p.id} className="productImage">
      {image?<img src={image} alt={p.name} loading="lazy"/>:<div className="placeholder">ছবি নেই</div>}
      {p.offer?<b className="badge">অফার</b>:null}
    </Link>
    <div className="productBody">
      <div className="muted">{p.category}</div>
      <Link href={'/product/'+p.id} className="productName">{p.name}</Link>
      <div className="price"><strong>{money(p.salePrice)}</strong>{p.regularPrice>p.salePrice?<del>{money(p.regularPrice)}</del>:null}</div>
      <div className="stock">স্টক: {p.stock}</div>
      <div className="productActions">
        <button disabled={!p.active||p.stock<1} onClick={()=>add(p)}>কার্টে যোগ করুন</button>
        <button className="buyNow" disabled={!p.active||p.stock<1} onClick={directOrder}>এখনই অর্ডার</button>
      </div>
    </div>
  </article>
}
