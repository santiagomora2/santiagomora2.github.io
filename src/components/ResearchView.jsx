import ViewFooter from "./ViewFooter";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import research from "../../content/research.json";

const STATUS_COLORS = {
    "In Progress": "bg-blue-100 text-blue-800",
    "Draft": "bg-yellow-100 text-yellow-800",
    "Published": "bg-green-100 text-green-800",
    "Completed": "bg-gray-100 text-gray-700",
};

const ResearchView = () => {
    const cardRefs = useRef([]);

    useGSAP(() => {
        gsap.set(cardRefs.current, { opacity: 0, y: 40 });
        gsap.to(cardRefs.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.2,
            ease: "power2.out",
            delay: 0.2,
        });
    });

    return (
        <div className="min-h-screen w-full bg-indigo-50">
            <div className="text-center py-8">
                <h1 className="font-serif font-bold text-4xl md:text-6xl text-indigo-900">
                    Research
                </h1>
            </div>

            <div className="px-4 md:px-16 lg:px-24 pb-44 md:pb-72">
                <div className="flex flex-col gap-6 max-w-4xl mx-auto">
                    {research.map((item, index) => (
                        <div
                            key={index}
                            ref={(el) => (cardRefs.current[index] = el)}
                            className="bg-white rounded-xl shadow-md p-6 border-2 border-transparent hover:border-indigo-400 hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                                <h2 className="font-bold text-xl text-indigo-900 flex-1">
                                    {item.title}
                                </h2>
                                <span
                                    className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${
                                        STATUS_COLORS[item.status] ??
                                        "bg-gray-100 text-gray-700"
                                    }`}
                                >
                                    {item.status}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 mb-3">
                                {item.institution} &middot; {item.period}
                            </p>
                            <p className="text-sm text-gray-700 leading-relaxed mb-4">
                                {item.description}
                            </p>
                            {item.findings && item.findings !== "..." && (
                                <div className="bg-indigo-50 rounded-lg p-3 mb-4">
                                    <p className="text-xs font-semibold text-indigo-700 uppercase tracking-wide mb-1">
                                        Findings
                                    </p>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        {item.findings}
                                    </p>
                                </div>
                            )}
                            <div className="flex flex-wrap gap-1">
                                {item.tech.map((t) => (
                                    <span
                                        key={t}
                                        className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ViewFooter />
        </div>
    );
};

export default ResearchView;
