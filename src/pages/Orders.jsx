import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/orders");
        setOrders(response.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading)
    return <div className="text-center p-4 text-gray-800">Loading...</div>;
  if (error)
    return <div className="text-center p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow overflow-hidden">
      <h1 className="text-2xl font-bold mb-4 text-black">Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        orders
          .filter((o) => o.buyer === user.email)
          .map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between border-b py-4"
            >
              <div className="text-left">
                <h2 className="font-bold text-black">Order ID: {order.id}</h2>
                <p className="text-gray-600">Total: ${order.total}</p>
                {order.buyer && (
                  <p className="text-gray-600">Buyer: {order.buyer}</p>
                )}
                <p className="text-gray-600">
                  Date: {new Date(order.date).toLocaleString()}
                </p>
                <ul className="list-disc list-inside">
                  {order.items.map((item) => (
                    <li key={item.id} className="text-gray-600">
                      {item.name} - ${item.price} x {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
      )}
    </div>
  );
}

export default Orders;
