import React, { useState } from 'react';
import Layout from '../../../components/Layout';


export const Payment = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expirationDate: '',
    cvv: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mock payment processing (replace this with actual payment processing logic)
    try {
      const response = await fetch('/your-payment-processing-endpoint', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Payment successful!');
        // Redirect to a success page or perform other actions as needed
      } else {
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment error. Please try again later.');
    }
  };

  return (
    <Layout>

    
    <div className="max-w-md mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="cardNumber"
          >
            Card Number
          </label>
          <input
            type="text"
            name="cardNumber"
            id="cardNumber"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Card Number"
            onChange={handleInputChange}
            value={formData.cardNumber}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="cardHolder"
          >
            Cardholder Name
          </label>
          <input
            type="text"
            name="cardHolder"
            id="cardHolder"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Cardholder Name"
            onChange={handleInputChange}
            value={formData.cardHolder}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="expirationDate"
          >
            Expiration Date
          </label>
          <input
            type="text"
            name="expirationDate"
            id="expirationDate"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="MM/YYYY"
            onChange={handleInputChange}
            value={formData.expirationDate}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="cvv"
          >
            CVV
          </label>
          <input
            type="text"
            name="cvv"
            id="cvv"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="CVV"
            onChange={handleInputChange}
            value={formData.cvv}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Pay
        </button>
      </form>
    </div>
    </Layout>
  );
};

export default Payment;
