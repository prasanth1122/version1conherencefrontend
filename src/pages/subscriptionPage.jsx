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
      bgColor: "",
      textColor: "text-black",
      hoverColor: "hover:shadow-lg hover:shadow-blue-400",
      buttonColor: "bg-secondary",
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
      bgColor: "bg-terinary",
      textColor: "text-gray-800",
      hoverColor: "hover:shadow-lg hover:shadow-yellow-400",
      buttonColor: "bg-yellow-600 hover:bg-yellow-700",
    },
    {
      title: "Institutional",

      description: "For institutions and larger teams.",
      features: [
        "Unlimited access to all articles",
        "Dedicated account manager",
        "Up to 50 user accounts",
      ],
      isRecommended: false,
      bgColor: "bg-white",
      textColor: "text-gray-900",
      hoverColor: "hover:shadow-lg hover:shadow-gray-400",
      buttonColor: "bg-gray-700 hover:bg-gray-800",
    },
  ];

  return (
    <section className="w-full h-full flex flex-col items-center pb-4 justify-between  bg-gray-100 overflow-x-hidden lg:overflow-y-hidden  scrollbar-hide">
      <Suspense fallback={<div>Loading Navbar...</div>}>
        <Navbar />
      </Suspense>
      <div className="w-mainWidth text-center mt-24">
        <div className="w-full bg-white p-2 rounded-lg flex flex-col md:flex-row items-start border-1 border-black-500  md:justify-between mb-2">
          <p className="text-lg font-bold">Basic</p>
          <p>
            <span className="text-lg font-bold">Start Date: </span> 02 Dec 2024
          </p>
          <p>
            <span className="text-lg font-bold">End Date: </span> 02 Jan 2025
          </p>
        </div>
      </div>

      <div className="w-mainWidth flex flex-col items-center gap-2 py-4 bg-white rounded-lg mt-4">
        <h1 className="text-4xl font-bold text-gray-900 tracking-wide mb-2">
          Choose Your Plan
        </h1>
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-12   p-4  text-black">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-between rounded-xl p-8 shadow-xl ${plan.bgColor} ${plan.textColor} transition-all duration-300 hover:scale-105 ${plan.hoverColor} border-2 border-black relative`}
            >
              {plan.isRecommended && (
                <div className="mb-4 px-6 py-2 absolute -top-4 bg-white text-yellow-800 font-bold rounded-full text-sm border border-black shadow-sm">
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
                      <LazyCheckCircleIcon className="text-green-300 min-w-20" />
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
      </div>
    </section>
  );
};

export default SubscriptionPage;
