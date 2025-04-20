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
        <div ref={ref} className="flex max-lg:flex-wrap text-white gap-12 px-6 my-10">
            {pricing.map((item, index) => (
                <motion.div
                    key={item.id}
                    className="bg-black/70 w-full h-[330px] fond-bolder px-6 bg-n-8 border border-black border-n-6 rounded-[2rem] lg:w-auto even:py-14 odd:py-8 odd:my-4 [&>h4]:first:text-color-2 [&>h4]:even:text-color-1 [&>h4]:last:text-color-3"
                    // Use different animations for the left, middle, and right items
                    initial={
                        index === 0 ? "hiddenLeft" : index === 2 ? "hiddenRight" : "visible"
                    }
                    animate={isInView ? "visible" : "hiddenLeft"} // Revert to hidden when out of view
                    variants={variants}
                    transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
                >

                    <div className="flex items-center  mb-4">
                        {item.price && (
                            <>
                                <div className="text-[28px] leading-none font-bold ">
                                    {item.price}
                                </div>
                            </>
                        )}
                    </div>

                    <ul>
                        {item.features.map((feature, featureIndex) => (
                            <li
                                key={featureIndex}
                                className="flex items-center py-3 border-t border-n-6"
                            >
                                <div className="absolute bg-blue-600  w-[6px] h-[6px] rounded-full"></div>
                                <p className="body-2 ml-4 text-[12px]">{feature}</p>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            ))}
        </div>
    );
};

export default PricingList;
