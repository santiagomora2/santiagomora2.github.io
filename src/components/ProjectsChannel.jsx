import { useState } from "react";

const ProjectsChannel = () => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [hoverTimeout, setHoverTimeout] = useState(null);

    const handleMouseEnter = () => {
        const id = setTimeout(() => setShowTooltip(true), 250);
        setHoverTimeout(id);
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverTimeout);
        setShowTooltip(false);
    };

    return (
        <div
            className="relative transparent-border hover:border-[#00c4ff] rounded-xl transition-border"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="bg-emerald-700 text-white text-center flex flex-col items-center justify-center font-mono rounded-lg w-full h-full overflow-hidden channel-height gap-1">
                <span className="md:text-[3vw] text-5xl font-bold leading-none">{"[ ]"}</span>
                <span className="md:text-[1vw] text-sm tracking-widest opacity-80">PROJECTS</span>
            </div>

            {showTooltip && (
                <div className="font-rodin absolute z-10 left-1/2 transform -translate-x-1/2 mt-2 px-24 py-2 bg-white text-black rounded-full text-xl border-2 border-gray-300 shadow-xl whitespace-nowrap">
                    <p>My Projects</p>
                </div>
            )}
        </div>
    );
};

export default ProjectsChannel;
