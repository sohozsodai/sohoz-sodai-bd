import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const orderId = Number(id);

    if (!Number.isInteger(orderId)) {
      return NextResponse.json(
        { error: 'Invalid order ID' },
        { status: 400 }
      );
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }
if (!['DELIVERED', 'CANCELLED'].includes(order.status)) {
      return NextResponse.json(
        { error: 'Only Delivered or Cancelled orders can be deleted' },
        { status: 400 }
      );
    }

    await prisma.order.delete({
      where: { id: orderId },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete order' },
      { status: 500 }
    );
  }
}