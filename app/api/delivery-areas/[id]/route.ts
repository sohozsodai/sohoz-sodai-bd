import {NextResponse} from 'next/server';import {prisma} from '@/lib/prisma';
export async function PUT(req:Request,{params}:{params:Promise<{id:string}>}){const {id}=await params;const b=await req.json();return NextResponse.json(await prisma.deliveryArea.update({where:{id:Number(id)},data:{name:b.name,charge:Number(b.charge||0),active:!!b.active,sortOrder:Number(b.sortOrder||0)}}))}
export async function DELETE(_:Request,{params}:{params:Promise<{id:string}>}){const {id}=await params;await prisma.deliveryArea.delete({where:{id:Number(id)}});return NextResponse.json({ok:true})}
