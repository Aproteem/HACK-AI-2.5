import { motion, useInView } from "framer-motion";
import { check } from "../assets";
import { pricing } from "../constants";
import Button from "./Button";
import { useRef } from "react";

const PricingList = () => {
    // Ref to detect when the pricing section is in view
    const ref = useRef(null);
    const isInView = useInView(ref, { triggerOnce: false, amount: 0.3 }); // Always trigger when 30% is visible

    // Animation variants
    const variants = {
        hiddenLeft: { opacity: 0, x: -200 },
        hiddenRight: { opacity: 0, x: 200 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <div ref={ref} className="flex gap-[1rem] max-lg:flex-wrap text-white">
            {pricing.map((item, index) => (
                <motion.div
                    key={item.id}
                    className="w-[19rem] max-lg:w-full h-full fond-bolder px-6 bg-n-8 border border-n-6 rounded-[2rem] lg:w-auto even:py-14 odd:py-8 odd:my-4 [&>h4]:first:text-color-2 [&>h4]:even:text-color-1 [&>h4]:last:text-color-3"
                    // Use different animations for the left, middle, and right items
                    initial={
                        index === 0 ? "hiddenLeft" : index === 2 ? "hiddenRight" : "visible"
                    }
                    animate={isInView ? "visible" : "hiddenLeft"} // Revert to hidden when out of view
                    variants={variants}
                    transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
                >
                    <p className="body-2 min-h-[4rem] mb-3 text-n-1/50">
                        {item.description}
                    </p>

                    <div className="flex items-center h-[5.5rem] mb-6">
                        {item.price && (
                            <>
                                <div className="text-[3rem] leading-none font-bold ">
                                    {item.price}
                                </div>
                            </>
                        )}
                    </div>

                    <ul>
                        {item.features.map((feature, featureIndex) => (
                            <li
                                key={featureIndex}
                                className="flex items-start py-5 border-t border-n-6"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="24" height="24" rx="12" fill="#AC6AFF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.8047 7.52925C18.0651 7.7896 18.0651 8.21171 17.8047 8.47206L10.4714 15.8054C10.2111 16.0657 9.78894 16.0657 9.5286 15.8054L6.19526 12.4721C5.93491 12.2117 5.93491 11.7896 6.19526 11.5292C6.45561 11.2689 6.87772 11.2689 7.13807 11.5292L10 14.3912L16.8619 7.52925C17.1223 7.2689 17.5444 7.2689 17.8047 7.52925Z" fill="#0E0C15"/>
</svg>
                                <p className="body-2 ml-4">{feature}</p>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            ))}
        </div>
    );
};

export default PricingList;
