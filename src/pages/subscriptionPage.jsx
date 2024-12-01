import { lazy, Suspense } from "react";

// Lazy-load Navbar component
const Navbar = lazy(() => import("../components/navbar/navbar"));

// Lazy-load the FaCheckCircle icon
const LazyCheckCircleIcon = lazy(() =>
  import("react-icons/fa").then((module) => ({ default: module.FaCheckCircle }))
);

const SubscriptionPage = () => {
  const plans = [
    {
      title: "Basic",
      price: "$10/month",
      description: "For individuals exploring our platform.",
      features: [
        "Access to general articles",
        "Basic support",
        "1 user account",
      ],
      isRecommended: false,
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-300",
      textColor: "text-white",
      hoverColor: "hover:shadow-lg hover:shadow-blue-400",
      buttonColor: "bg-blue-700 hover:bg-blue-800",
    },
    {
      title: "Premium",
      price: "$20/month",
      description: "For professionals who need more.",
      features: [
        "Access to general and premium articles",
        "Priority support",
        "5 user accounts",
      ],
      isRecommended: true,
      bgColor: "bg-gradient-to-br from-yellow-500 to-yellow-300",
      textColor: "text-gray-800",
      hoverColor: "hover:shadow-lg hover:shadow-yellow-400",
      buttonColor: "bg-yellow-600 hover:bg-yellow-700",
    },
    {
      title: "Institutional",
      price: "$50/month",
      description: "For institutions and larger teams.",
      features: [
        "Unlimited access to all articles",
        "Dedicated account manager",
        "Up to 50 user accounts",
      ],
      isRecommended: false,
      bgColor: "bg-gradient-to-br from-gray-500 to-gray-300",
      textColor: "text-gray-900",
      hoverColor: "hover:shadow-lg hover:shadow-gray-400",
      buttonColor: "bg-gray-700 hover:bg-gray-800",
    },
  ];

  return (
    <section className="w-full h-full flex flex-col items-center bg-gray-100">
      <Suspense fallback={<div>Loading Navbar...</div>}>
        <Navbar />
      </Suspense>
      <div className="w-full text-center mt-24">
        <h1 className="text-5xl font-bold text-gray-900 tracking-wide">
          Choose Your Plan
        </h1>
        <p className="text-gray-700 mt-4 text-lg">
          Discover the right subscription for you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-mainWidth mt-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`flex flex-col items-center rounded-xl p-8 shadow-xl ${plan.bgColor} ${plan.textColor} transition-all duration-300 hover:scale-105 ${plan.hoverColor}`}
          >
            {plan.isRecommended && (
              <div className="mb-4 px-6 py-2 bg-white text-yellow-800 font-bold rounded-full text-sm border border-yellow-400 shadow-sm">
                Recommended
              </div>
            )}
            <h2 className="text-3xl font-bold">{plan.title}</h2>
            <p className="text-2xl font-semibold mt-4">{plan.price}</p>
            <p className="text-lg mt-4 text-center">{plan.description}</p>
            <ul className="mt-8 space-y-3 text-left">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Suspense
                    fallback={
                      <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
                    }
                  >
                    <LazyCheckCircleIcon className="text-green-300" />
                  </Suspense>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className={`mt-8 px-6 py-3 rounded-lg ${plan.buttonColor} text-white font-semibold tracking-wide shadow-md hover:shadow-xl transition-transform duration-300`}
              onClick={() => {
                alert(`Subscribed to ${plan.title}`);
              }}
            >
              Subscribe Now
            </button>
          </div>
        ))}
      </div>

      <footer className="w-full py-2 bg-gray-900 text-white text-center mt-10">
        <p className="text-sm">
          &copy; 2024 Coherence Applied. All rights reserved.
        </p>
      </footer>
    </section>
  );
};

export default SubscriptionPage;
