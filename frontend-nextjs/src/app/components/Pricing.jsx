
import PricingList from "./PricingList";
import { LeftLine, RightLine } from "./design/Pricing";

const Pricing = () => {
    return (
        <div className="overflow-hidden mb-10" id="pricing">
            <div className="container relative z-2">
                <h2 className="text-white mt-10 mb-8 text-5xl font-bold text-center">Make informed decisions using our analytics</h2>
                

                <div className="relative">
                    <PricingList />
                    <LeftLine />
                    <RightLine />
                </div>
            </div>
        </div>
    );
};

export default Pricing;
