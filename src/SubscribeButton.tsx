// src/SubscribeButton.tsx
export default function SubscribeButton() {
  const checkoutUrl =
    import.meta.env.VITE_STRIPE_CHECKOUT_URL ||
    "https://buy.stripe.com/your_fallback_checkout_link"; // TODO: replace or set env var on Vercel

  const handleSubscribe = () => {
    window.location.href = checkoutUrl;
  };

  return (
    <button
      onClick={handleSubscribe}
      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
    >
      Subscribe Now (€29/month)
    </button>
  );
}
