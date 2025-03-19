const crypto = require('crypto');

exports.processPayment = async (req, res) => {
  const { amount, orderId, customer, paymentMethod } = req.body;
  
  if (paymentMethod === 'payhere') {
    // Build the parameters required by PayHere
    const payhereParams = {
      merchant_id: process.env.PAYHERE_MERCHANT_ID,
      return_url: process.env.PAYHERE_RETURN_URL,
      cancel_url: process.env.PAYHERE_CANCEL_URL,
      notify_url: process.env.PAYHERE_NOTIFY_URL,
      order_id: orderId,
      items: "Order Payment",
      currency: "LKR",
      amount: amount,
      first_name: customer.firstName,
      last_name: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      country: customer.country
    };

    // Generate the signature using HMAC-SHA256 with your secret key.
    const dataToSign = `${payhereParams.merchant_id}${payhereParams.order_id}${payhereParams.currency}${payhereParams.amount}`;
    const signature = crypto.createHmac('sha256', process.env.PAYHERE_SECRET)
                              .update(dataToSign)
                              .digest('hex');
    payhereParams.signature = signature;
    
    // Return the PayHere checkout URL and parameters for the client to redirect.
    return res.json({ paymentUrl: process.env.PAYHERE_CHECKOUT_URL, params: payhereParams });
  } else {
    // Fallback for other payment methods
    res.json({ status: 'success', message: `Processed payment of LKR ${amount} using ${paymentMethod}` });
  }
};
