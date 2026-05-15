import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import ViewFooter from "./ViewFooter";
import skills from "../../content/skills.json";

const CATEGORIES = Object.entries(skills);
const TOTAL_STEPS = CATEGORIES.length * 2;
const STEP_INTERVAL = 350;

const TechnologiesView = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const isShortScreen = useMediaQuery({ maxHeight: 750 });

    useEffect(() => {
        if (currentStep >= TOTAL_STEPS) return;

        const delay = STEP_INTERVAL;

        const id = setTimeout(() => {
            setCurrentStep((prev) => prev + 1);
        }, delay);

        return () => clearTimeout(id);
    }, [currentStep]);

    return (
        <div className="min-h-screen w-full bg-blue-950">
            <div
                className={`flex flex-col font-mono text-white gap-5 px-8 md:px-16 lg:px-24 pb-44 md:pb-72 ${
                    isShortScreen ? "pt-2 text-sm" : "pt-8 text-base md:text-lg"
                }`}
            >
                {CATEGORIES.map(([category, items], catIndex) => {
                    const headerStep = catIndex * 2 + 1;
                    const pillsStep = catIndex * 2 + 2;
                    return (
                        <div key={category}>
                            <h2
                                className={`font-bold mb-2 transition-opacity duration-500 ${
                                    isShortScreen ? "text-base" : "text-lg md:text-[1.8vw]"
                                } ${currentStep >= headerStep ? "opacity-100" : "opacity-0"}`}
                            >
                                {category}
                            </h2>
                            <div
                                className={`flex flex-wrap gap-2 transition-opacity duration-500 ${
                                    currentStep >= pillsStep ? "opacity-100" : "opacity-0"
                                }`}
                            >
                                {items.map((skill) => (
                                    <span
                                        key={skill}
                                        className={`bg-blue-800 text-blue-100 rounded-full px-3 py-1 ${
                                            isShortScreen ? "text-xs" : "text-sm md:text-[1vw]"
                                        }`}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
            <ViewFooter />
        </div>
    );
};

export default TechnologiesView;
