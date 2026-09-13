export function arr(v:any){try{return Array.isArray(v)?v:JSON.parse(v||'[]')}catch{return []}}
export function money(n:any){return `৳${Number(n||0).toLocaleString('en-US')}`}
export function slugify(s:string){return String(s||'').trim().toLowerCase().replace(/[^\p{L}\p{N}]+/gu,'-').replace(/^-+|-+$/g,'') || `item-${Date.now()}`}
export const ORDER_STATUSES=['PENDING','CONFIRMED','PROCESSING','DELIVERED','CANCELLED'] as const
export const statusBn:any={PENDING:'Pending',NEW:'Pending',CONFIRMED:'Confirmed',PROCESSING:'Processing',DELIVERED:'Delivered',CANCELLED:'Cancelled'}
