import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ResearchChannel = () => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [hoverTimeout, setHoverTimeout] = useState(null);
    const symbolRef = useRef();

    const handleMouseEnter = () => {
        const id = setTimeout(() => setShowTooltip(true), 250);
        setHoverTimeout(id);
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverTimeout);
        setShowTooltip(false);
    };

    useGSAP(() => {
        gsap.to(symbolRef.current, {
            opacity: 0.4,
            duration: 1.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });
    });

    return (
        <div
            className="relative transparent-border hover:border-[#00c4ff] rounded-xl transition-border"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="bg-indigo-800 text-white text-center flex flex-col items-center justify-center font-mono rounded-lg w-full h-full overflow-hidden channel-height gap-1">
                <span
                    ref={symbolRef}
                    className="md:text-[3.5vw] text-6xl font-bold leading-none"
                >
                    ∂
                </span>
                <span className="md:text-[1vw] text-sm tracking-widest opacity-80">RESEARCH</span>
            </div>

            {showTooltip && (
                <div className="font-rodin absolute z-10 left-1/2 transform -translate-x-1/2 mt-2 px-24 py-2 bg-white text-black rounded-full text-xl border-2 border-gray-300 shadow-xl whitespace-nowrap">
                    <p>Research</p>
                </div>
            )}
        </div>
    );
};

export default ResearchChannel;
