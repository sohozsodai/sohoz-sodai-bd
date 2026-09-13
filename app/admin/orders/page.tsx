import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { money } from '@/lib/data';

export default async function Orders() {
  const os = await prisma.order.findMany({
    where: {
      status: {
        notIn: ['DELIVERED', 'CANCELLED'],
      },
    },
    include: {
      customer: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <>
      <div className="adminTop">
        <div>
          <h1>Orders</h1>
          <p>সক্রিয় অর্ডারগুলো এখানে দেখানো হচ্ছে। Delivered ও Cancelled অর্ডার এখানে থাকবে না।</p>
        </div>
      </div>

      <div className="tableWrap">
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Total</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {os.map((o) => (
              <tr key={o.id}>
                <td>
                  <b>{o.orderNo}</b>
                  <small>
                    {new Date(o.createdAt).toLocaleString('bn-BD')}
                  </small>
                </td>

                <td>{o.customer.name}</td>

                <td>{o.customer.phone}</td>

                <td>{money(o.total)}</td>

                <td>
                  <span className="pill">{o.status}</span>
                </td>

                <td>
                  <Link href={'/admin/orders/' + o.id}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {os.length === 0 ? (
        <div className="empty">
          বর্তমানে কোনো সক্রিয় অর্ডার নেই।
        </div>
      ) : null}
    </>
  );
}