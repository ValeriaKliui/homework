import React from "react";

type PricingCardProps = {
    plan: string;
    price: string;
    features: string[];
    isFeatured?: boolean;
};

export const PricingCard: React.FC<PricingCardProps> = ({
    plan,
    price,
    features,
    isFeatured = false,
}) => {
    return (
        <div
            tabIndex={0}
            className={`flex flex-col items-center justify-between md px-6 py-8 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-shadow duration-200
        ${!isFeatured
                    ? "bg-white text-slate-800 shadow-md border border-slate-200 hover:shadow-lg focus:ring-indigo-500"
                    : "bg-slate-800 text-white hover:shadow-xl focus:ring-indigo-500 scale-110"
                }`}
        >
            <h3 className="text-lg font-medium mb-2">{plan}</h3>
            <div className="text-4xl font-bold mb-4">{price}</div>
            <ul className="w-full space-y-2 text-center mb-6">
                {features.map((feature, idx) => (
                    <li
                        key={idx}
                        className={`border-t py-2 ${isFeatured ? "border-slate-200" : "border-slate-600"
                            }`}
                    >
                        {feature}
                    </li>
                ))}
            </ul>
            <button
                className={`mt-auto font-semibold px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2
          ${!isFeatured
                        ? "hover:bg-slate-100 focus:ring-indigo-500"
                        : "hover:bg-slate-100 focus:ring-indigo-500"
                    }`}
            >
                SUBSCRIBE
            </button>
        </div>
    );
};
