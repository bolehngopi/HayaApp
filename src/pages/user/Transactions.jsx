import { useEffect, useState, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import apiClient from "../../api/apiClient";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openTransactionId, setOpenTransactionId] = useState(null);
  const { session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session.auth) {
      navigate("/login");
    }
  }, [navigate]);

  const fetchTransactions = async () => {
    try {
      const response = await apiClient.get("/checkout");
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const toggleAccordion = (id) => {
    setOpenTransactionId((prevId) => (prevId === id ? null : id));
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "canceled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const calculateOriginalAmount = (totalAmount) => {
    const ppnRate = 1.11;
    const shippingRate = 1.01;
    return totalAmount / (ppnRate * shippingRate);
  };

  const calculatePPN = (originalAmount) => originalAmount * 0.11;
  const calculateShipping = (originalAmount) => originalAmount * 0.01;

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <header className="text-center">
          <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Your Transactions
          </h1>
        </header>

        <div className="mt-8 min-h-96">
          {loading ? (
            <p className="text-center text-gray-500">Loading transactions...</p>
          ) : transactions.length === 0 ? (
            <p className="text-center text-gray-500">No transactions found.</p>
          ) : (
            <div className="bg-white shadow-md rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 bg-gray-200 text-left">ID</th>
                      <th className="py-2 px-4 bg-gray-200 text-left">Date</th>
                      <th className="py-2 px-4 bg-gray-200 text-left">Amount</th>
                      <th className="py-2 px-4 bg-gray-200 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => {
                      const originalAmount = calculateOriginalAmount(transaction.total_amount);
                      const ppn = calculatePPN(originalAmount);
                      const shipping = calculateShipping(originalAmount);

                      return (
                        <Fragment key={transaction.id}>
                          <tr
                            onClick={() => toggleAccordion(transaction.id)}
                            className="border-t hover:bg-gray-100 cursor-pointer"
                          >
                            <td className="py-2 px-4">{transaction.id}</td>
                            <td className="py-2 px-4">{new Date(transaction.created_at).toLocaleDateString()}</td>
                            <td className="py-2 px-4">
                              {formatCurrency(transaction.total_amount)}
                              <div className="text-sm text-gray-500">
                                {formatCurrency(originalAmount)} (Before) +{formatCurrency(ppn)} (PPN) +{formatCurrency(shipping)} (Shipping)
                              </div>
                            </td>
                            <td className={`py-2 px-4 ${getStatusClass(transaction.status)}`}>
                              {transaction.status}
                            </td>
                          </tr>

                          <AnimatePresence>
                            {openTransactionId === transaction.id && (
                              <motion.tr
                                initial={{ opacity: 0, maxHeight: 0 }}
                                animate={{ opacity: 1, maxHeight: 400 }}
                                exit={{ opacity: 0, maxHeight: 0 }}
                                transition={{
                                  duration: 0.5,
                                  ease: [0.25, 0.1, 0.25, 1], // Smooth cubic bezier easing
                                }}
                                className="overflow-hidden"
                              >
                                <td colSpan={4} className="bg-gray-50 border-t px-4 py-4">
                                  <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{
                                      duration: 0.3,
                                      ease: "easeInOut",
                                    }}
                                    className="space-y-4"
                                  >
                                    <h2 className="text-lg font-semibold">Transaction Details</h2>
                                    <ul className="list-disc list-inside text-gray-700">
                                      {transaction.items &&
                                        transaction.items.map((item, index) => (
                                          <li key={index}>
                                            <strong>{item.product.name}</strong> - {item.quantity} x{" "}
                                            {formatCurrency(item.product.price)}
                                          </li>
                                        ))}
                                    </ul>
                                    <div className="border-t pt-4 space-y-2">
                                      <p>
                                        <strong>Shipping Address:</strong>
                                        <br />
                                        {transaction.shipping_address}
                                      </p>
                                      <p>
                                        <strong>User ID:</strong> {transaction.user_id}
                                      </p>
                                      <p>
                                        <strong>Updated At:</strong>{" "}
                                        {new Date(transaction.updated_at).toLocaleString()}
                                      </p>
                                    </div>
                                  </motion.div>
                                </td>
                              </motion.tr>
                            )}
                          </AnimatePresence>
                        </Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
