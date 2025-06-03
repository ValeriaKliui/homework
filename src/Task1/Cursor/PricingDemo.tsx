import React from 'react';
import { PricingCard } from './PricingCard';

export const CursorPricingDemo: React.FC = () => {
    return (
        <div className="min-h-screen py-16 px-4">
            <h1 className="text-3xl font-bold text-white text-center mb-12">Pricing</h1>
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3">
                <PricingCard
                    plan="Standard"
                    price="$100"
                    features={[
                        "50,000 Requests",
                        "4 contributors",
                        "Up to 3 GB storage space"
                    ]}
                />
                <PricingCard
                    plan="Pro"
                    price="$200"
                    features={[
                        "100,000 Requests",
                        "7 contributors",
                        "Up to 6 GB storage space"
                    ]}
                    isFeatured={true}
                />
                <PricingCard
                    plan="Expert"
                    price="$500"
                    features={[
                        "200,000 Requests",
                        "11 contributors",
                        "Up to 10 GB storage space"
                    ]}
                />
            </div>
        </div>
    );
}; 