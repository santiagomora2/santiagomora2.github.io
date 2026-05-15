import ViewFooter from "./ViewFooter";
import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import experiences from "../../content/experience.json";

const COLORS = [
    "bg-green-600",
    "bg-yellow-600",
    "bg-blue-600",
    "bg-purple-600",
    "bg-rose-600",
    "bg-teal-600",
];

const WorkExperienceView = () => {
    const lineRef = useRef();
    const experienceRefs = useRef([]);
    const [hoveredItem, setHoveredItem] = useState(null);

    useGSAP(() => {
        gsap.set(experienceRefs.current, { opacity: 0, y: 50, scale: 0.8 });
        gsap.set(lineRef.current, { scaleX: 0, opacity: 0 });

        gsap.to(lineRef.current, {
            scaleX: 1,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
                experienceRefs.current.forEach((ref, index) => {
                    if (ref) {
                        gsap.to(ref, {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.6,
                            delay: index * 0.3,
                            ease: "back.out(1.7)",
                        });
                    }
                });
            },
        });
    });

    return (
        <div className="min-h-screen w-full bg-amber-200">
            <div className="text-center py-8">
                <h1 className="font-serif font-bold text-4xl md:text-6xl text-amber-900">
                    Professional Experience
                </h1>
            </div>

            {/* Mobile: vertical stack */}
            <div className="md:hidden px-4 pb-44 flex flex-col gap-8">
                {experiences.map((exp, index) => (
                    <div
                        key={index}
                        ref={(el) => (experienceRefs.current[index] = el)}
                        className="bg-white rounded-lg shadow-lg p-4 border-l-4"
                        style={{ borderLeftColor: COLORS[index % COLORS.length].replace("bg-", "").replace("-600", "") }}
                    >
                        <p className="text-xs font-bold text-amber-700 mb-1">
                            {exp["time-interval"]}
                        </p>
                        <h3 className="font-bold text-lg text-amber-900 mb-1">
                            {exp.company}
                        </h3>
                        <h4 className="font-semibold text-sm text-blue-700 mb-2">
                            {exp.job_title}
                        </h4>
                        <p className="text-xs text-gray-500 mb-2">{exp.location}</p>
                        <ul className="text-sm text-gray-700 leading-relaxed space-y-1">
                            {exp.highlights.map((h, i) => (
                                <li key={i}>— {h}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Desktop: horizontal scrollable timeline */}
            <div className="hidden md:block pb-72 relative">
                {/* Scroll fade hint on right edge */}
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-amber-200 to-transparent z-10" />

                <div className="overflow-x-auto px-8 pb-4">
                    <div className="relative flex flex-row items-start gap-6 min-w-max pt-2">
                        {/* Timeline line — spans the full scrollable width */}
                        <div
                            ref={lineRef}
                            className="absolute left-4 right-4 h-2 bg-amber-600 rounded-full shadow-lg z-0"
                            style={{ top: "3.75rem" }}
                        />

                        {experiences.map((exp, index) => (
                            <div
                                key={index}
                                ref={(el) => (experienceRefs.current[index] = el)}
                                className="relative flex flex-col items-center group w-72 flex-shrink-0"
                                onMouseEnter={() => setHoveredItem(index)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                {/* Date badge */}
                                <div className="mb-4 text-center">
                                    <p className="text-sm font-bold text-amber-900 bg-white px-3 py-1 rounded-full shadow-md border-2 border-amber-600 whitespace-nowrap">
                                        {exp["time-interval"]}
                                    </p>
                                </div>

                                {/* Circle on timeline */}
                                <div
                                    className={`w-10 h-10 rounded-full ${
                                        COLORS[index % COLORS.length]
                                    } flex items-center justify-center border-4 border-white shadow-lg transform transition-all duration-300 group-hover:scale-125 group-hover:shadow-2xl relative z-20 mb-6`}
                                />

                                {/* Experience card */}
                                <div
                                    className={`p-4 bg-white rounded-lg shadow-lg w-full transition-all duration-300 ${
                                        hoveredItem === index
                                            ? "scale-105 shadow-2xl border-2 border-amber-400"
                                            : "border-2 border-transparent"
                                    }`}
                                >
                                    <h3 className="font-bold text-base text-amber-900 mb-1 text-center">
                                        {exp.company}
                                    </h3>
                                    <h4 className="font-semibold text-sm text-blue-700 mb-1 text-center">
                                        {exp.job_title}
                                    </h4>
                                    <p className="text-xs text-gray-500 mb-3 text-center">
                                        {exp.location}
                                    </p>
                                    <ul className="text-sm text-gray-700 leading-relaxed space-y-1">
                                        {exp.highlights.map((h, i) => (
                                            <li key={i}>— {h}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <ViewFooter />
        </div>
    );
};

export default WorkExperienceView;
