import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { getAdminSession } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    if (!(await getAdminSession())) return NextResponse.json({ error: 'Admin login required' }, { status: 401 });
    const form = await req.formData();
    const f = form.get('file');

    if (!(f instanceof File)) {
      return NextResponse.json({ error: 'ফাইল পাওয়া যায়নি' }, { status: 400 });
    }
    if (!f.type.startsWith('image/')) {
      return NextResponse.json({ error: 'শুধু ছবি দিন' }, { status: 400 });
    }
    if (f.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'ছবির আকার ৫MB-এর কম হতে হবে' }, { status: 400 });
    }

    const ext = (f.name.split('.').pop() || 'jpg').replace(/[^a-z0-9]/gi, '') || 'jpg';
    const name = `sohoz-sodai/${Date.now()}-${crypto.randomBytes(6).toString('hex')}.${ext}`;

    // Production: Vercel Blob gives persistent public URLs.
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(name, f, { access: 'public', addRandomSuffix: false });
      return NextResponse.json({ url: blob.url });
    }

    // Local development fallback.
    const localName = crypto.randomBytes(8).toString('hex') + '.' + ext;
    const dir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, localName), Buffer.from(await f.arrayBuffer()));
    return NextResponse.json({ url: '/uploads/' + localName });
  } catch (error) {
    console.error('UPLOAD_ERROR', error);
    return NextResponse.json({ error: 'ছবি upload করা যায়নি। আবার চেষ্টা করুন।' }, { status: 500 });
  }
}
