import { CursorPricingDemo } from "./Cursor/PricingDemo"
import GPTCards from "./gpt"

export const Task1 = () => {
    return (
        <div className="bg-gray-900">
            <GPTCards />
            <CursorPricingDemo />
        </div>
    )
}