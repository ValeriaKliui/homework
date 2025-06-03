import React from 'react';

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
            className={`relative w-full max-w-sm p-6 transition-all duration-300
                ${isFeatured
                    ? 'bg-[#2e3e50] text-white transform scale-105 z-10'
                    : 'bg-white text-[#2e3e50]'}
                hover:shadow-xl focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-offset-2
                sm:transform-none sm:hover:-translate-y-1
                flex flex-col items-center text-center`}
        >
            <h3 className="text-lg font-semibold mb-4">{plan}</h3>
            <p className="text-4xl font-bold mb-6">{price}</p>

            <div className="w-full space-y-4 mb-8">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className={`py-3 border-b ${isFeatured ? 'border-gray-500' : 'border-gray-200'
                            } last:border-b-0`}
                    >
                        <p className="text-sm font-semibold">{feature}</p>
                    </div>
                ))}
            </div>

            <button
                className={`w-full py-2 px-6 rounded transition-colors duration-200
                    text-sm font-semibold tracking-wide
                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2`}
            >
                SUBSCRIBE
            </button>
        </div>
    );
}; 