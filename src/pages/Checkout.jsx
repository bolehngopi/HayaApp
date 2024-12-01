import { useState, useEffect } from "react";
import apiClient from "../api/apiClient";
import { NavLink, useNavigate } from "react-router-dom";

export const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const fetchUserInfo = async () => {
    try {
      const response = await apiClient.get("/auth/profile");
      const data = response.data.data;
      setShippingInfo((prev) => ({
        ...prev,
        name: data.name,
        address: data.address,
        // city: data.city,
        // postalCode: data.postalCode,
        // country: data.country,
      }));
    } catch (error) {
      console.log("Error fetching user info", error);
    }
  }

  const fetchCart = async () => {
    try {
      const response = await apiClient.get("/cart");
      const data = response.data;
      setCart(data.cart);
      setTotalPrice(data.total_price);
      console.log("Cart data", cart);
    } catch (error) {
      console.log("Error fetching cart", error);
    }
  };

  useEffect(() => {
    fetchCart();
    fetchUserInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const orderData = {
        cart,
        shippingInfo,
        paymentMethod,
      };
      const response = await apiClient.post("/checkout", orderData);
      console.log("Order placed successfully", response.data);
      // Handle successful order placement (redirect, confirmation, etc.)
    } catch (error) {
      console.error("Error placing order", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Checkout</h1>
          </header>

          <div className="mt-8 space-y-8">
            {/* Cart Items */}
            <div>
              <h2 className="text-lg font-semibold">Your Cart</h2>
              <ul className="space-y-4 pt-2">
                {cart.map((item, i) => (
                  <li key={i} className="flex items-center justify-between gap-4">
                    <div className="flex items-center">
                      <img
                        src={item.product.image_cover}
                        alt={item.product.name}
                        className="h-16 w-16 rounded object-cover"
                      />
                      <div className="ml-4">
                        <h3 className="text-sm text-gray-900">{item.product.name}</h3>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        <p className="text-sm text-gray-600">Price: £{item.product.price}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Shipping Information */}
            <div>
              <h2 className="text-lg font-semibold">Shipping Information</h2>
              <form className="space-y-4 pt-2">
                <input
                  type="text"
                  name="name"
                  value={shippingInfo.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="w-full px-4 py-2 border rounded"
                />
                <input
                  type="text"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                  className="w-full px-4 py-2 border rounded"
                />
                <input
                  type="text"
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="w-full px-4 py-2 border rounded"
                />
                <input
                  type="text"
                  name="postalCode"
                  value={shippingInfo.postalCode}
                  onChange={handleInputChange}
                  placeholder="Postal Code"
                  className="w-full px-4 py-2 border rounded"
                />
                <input
                  type="text"
                  name="country"
                  value={shippingInfo.country}
                  onChange={handleInputChange}
                  placeholder="Country"
                  className="w-full px-4 py-2 border rounded"
                />
              </form>
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="text-lg font-semibold">Shipping Address</h2>
              <div className="pt-2">
                <p className="text-gray-800">
                  {shippingInfo.name} <br />
                  {shippingInfo.address} <br />
                  {shippingInfo.city}, {shippingInfo.postalCode} <br />
                  {shippingInfo.country}
                </p>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="text-lg font-semibold">Payment Method</h2>
              <fieldset className="pt-2">
                <div className="space-y-2">
                  <label
                    htmlFor="Option1"
                    className="flex cursor-pointer items-start gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50 has-[:checked]:bg-blue-50"
                  >
                    <div className="flex items-center">
                      &#8203;
                      <input type="checkbox" className="size-4 rounded border-gray-300"
                        id="Option1"
                        name="paymentMethod"
                        value="creditCard"
                        checked={paymentMethod === "creditCard"}
                        onChange={(e) => setPaymentMethod(e.target.value)} />
                    </div>

                    <div>
                      <strong className="font-medium text-gray-900"> Credit Card</strong>
                    </div>
                  </label>

                  <label
                    htmlFor="Option2"
                    className="flex cursor-pointer items-start gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50 has-[:checked]:bg-blue-50"
                  >
                    <div className="flex items-center">
                      &#8203;
                      <input type="checkbox"
                        className="size-4 rounded border-gray-300"
                        id="paypal"
                        name="paymentMethod"
                        value="paypal"
                        checked={paymentMethod === "paypal"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                    </div>

                    <div>
                      <strong className="font-medium text-gray-900"> PayPal </strong>
                    </div>
                  </label>
                </div>
              </fieldset>
            </div>

            {/* Order Summary */}
            <div>
              <h2 className="text-lg font-semibold">Order Summary</h2>
              <div className="space-y-4 pt-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rp. {totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Rp. 50.000</span> {/* Example shipping cost */}
                </div>
                <div className="flex justify-between font-semibold text-xl">
                  <span>Total</span>
                  <span>Rp. {totalPrice + 50}</span> {/* Total with shipping */}
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="flex justify-end gap-4">
              <NavLink
                to="/cart"
                className="bg-slate-600 text-white px-6 py-2 rounded hover:bg-slate-500"
              >
                Get Back
              </NavLink>
              <button
                onClick={handleCheckout}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-500"
                disabled={loading}
              >
                {loading ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
