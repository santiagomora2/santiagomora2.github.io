import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const BlogChannel = () => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [hoverTimeout, setHoverTimeout] = useState(null);
    const cursorRef = useRef();

    const handleMouseEnter = () => {
        const id = setTimeout(() => setShowTooltip(true), 250);
        setHoverTimeout(id);
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverTimeout);
        setShowTooltip(false);
    };

    useGSAP(() => {
        gsap.to(cursorRef.current, {
            opacity: 0,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            ease: "steps(1)",
        });
    });

    return (
        <div
            className="relative transparent-border hover:border-[#00c4ff] rounded-xl transition-border"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="bg-rose-700 text-white text-center flex flex-col items-center justify-center font-mono rounded-lg w-full h-full overflow-hidden channel-height gap-1">
                <div className="md:text-[2vw] text-3xl font-bold leading-none flex items-center">
                    <span>Blog</span>
                    <span ref={cursorRef} className="ml-0.5">_</span>
                </div>
                <span className="md:text-[0.9vw] text-xs tracking-widest opacity-80">POSTS</span>
            </div>

            {showTooltip && (
                <div className="font-rodin absolute z-10 left-1/2 transform -translate-x-1/2 mt-2 px-24 py-2 bg-white text-black rounded-full text-xl border-2 border-gray-300 shadow-xl whitespace-nowrap">
                    <p>Blog</p>
                </div>
            )}
        </div>
    );
};

export default BlogChannel;
