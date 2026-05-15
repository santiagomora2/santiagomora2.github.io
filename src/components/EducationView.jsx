import ViewFooter from "./ViewFooter";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import education from "../../content/education.json";

const EducationView = () => {
    const cardRefs = useRef([]);

    useGSAP(() => {
        gsap.set(cardRefs.current, { opacity: 0, y: 40 });
        gsap.to(cardRefs.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "back.out(1.7)",
            delay: 0.2,
        });
    });

    return (
        <div className="min-h-screen w-full bg-sky-50">
            <div className="text-center py-8">
                <h1 className="font-serif font-bold text-4xl md:text-6xl text-sky-900">
                    Education
                </h1>
            </div>

            <div className="px-4 md:px-16 lg:px-24 pb-44 md:pb-72 flex justify-center">
                <div className="flex flex-col gap-6 w-full max-w-2xl mt-4">
                    {education.map((item, index) => (
                        <div
                            key={index}
                            ref={(el) => (cardRefs.current[index] = el)}
                            className="bg-white rounded-xl shadow-md p-6 border-l-4 border-sky-500 hover:shadow-xl transition-shadow duration-300"
                        >
                            <h2 className="font-bold text-xl text-sky-900 mb-1">
                                {item.institution}
                            </h2>
                            <p className="text-base text-gray-700 font-semibold mb-2">
                                {item.degree}
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                <span>{item.period}</span>
                                <span>{item.location}</span>
                                {item.gpa && (
                                    <span className="font-semibold text-sky-700">
                                        GPA: {item.gpa}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ViewFooter />
        </div>
    );
};

export default EducationView;
