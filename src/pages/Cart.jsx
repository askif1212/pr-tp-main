import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function Cart() {
  const { cartItems, removeFromCart, addToCart, decrementCart } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();
  const groupedItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  const total = groupedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!groupedItems.length) return;
    try {
      const order = {
        items: groupedItems,
        total: total.toFixed(2),
        date: new Date().toISOString(),
        buyer: user.email,
      };
      await axios.post("http://localhost:5000/orders", order);
      navigate("/checkout");
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow overflow-auto">
      <h1 className="text-2xl font-bold mb-4 text-black">Your Cart</h1>
      {groupedItems.length === 0 ? (
        <p className="text-gray-600">
          You have not added anything to the cart.
        </p>
      ) : (
        groupedItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b py-4"
          >
            <div className="flex items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover mr-4"
              />
              <div>
                <h2 className="font-bold text-black">{item.name}</h2>
                <p className="text-gray-600">
                  ${item.price} x {item.quantity}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => addToCart(item)}
                className="text-green-600 hover:text-green-700 mx-2"
              >
                +
              </button>
              <span className="text-black mx-2">{item.quantity}</span>
              <button
                onClick={() => decrementCart(item.id)}
                className="text-red-600 hover:text-red-700 mx-2"
              >
                -
              </button>
              <button
                onClick={() => removeFromCart(item.id, true)}
                className="text-red-600 hover:text-red-700 mx-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}
      {groupedItems.length > 0 && (
        <div className="mt-4 text-xl font-bold text-black">
          Total: ${total.toFixed(2)}
        </div>
      )}
      {groupedItems.length > 0 && (
        <button
          onClick={handleCheckout}
          className="mt-4 !bg-green-600 text-black px-4 py-2 rounded hover:bg-green-700"
        >
          Proceed to Checkout
        </button>
      )}
    </div>
  );
}

export default Cart;
