import Image from "next/image";
import { PricingCard } from "./PricingCard";

export const pricingPlans = [
    {
        plan: "Standard",
        price: "$100",
        features: [
            "50,000 Requests",
            "4 contributors",
            "Up to 3 GB storage space",
        ],
        isFeatured: false,
    },
    {
        plan: "Pro",
        price: "$200",
        features: [
            "100,000 Requests",
            "7 contributors",
            "Up to 6 GB storage space",
        ],
        isFeatured: true,
    },
    {
        plan: "Expert",
        price: "$500",
        features: [
            "200,000 Requests",
            "11 contributors",
            "Up to 10 GB storage space",
        ],
        isFeatured: false,
    },
];


export default function GPTCards() {
    return (
        <div>
            <h2 className="text-2xl font-semibold text-center mb-8 text-white">Pricing</h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
                {pricingPlans.map((plan, idx) => (
                    <PricingCard key={idx} {...plan} />
                ))}
            </div>
        </div>
    );
}
