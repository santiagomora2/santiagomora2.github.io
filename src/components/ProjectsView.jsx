import ViewFooter from "./ViewFooter";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import projects from "../../content/projects.json";

const ProjectsView = () => {
    const cardRefs = useRef([]);

    useGSAP(() => {
        gsap.set(cardRefs.current, { opacity: 0, y: 40 });
        gsap.to(cardRefs.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.15,
            ease: "power2.out",
            delay: 0.2,
        });
    });

    return (
        <div className="min-h-screen w-full bg-emerald-50">
            <div className="text-center py-8">
                <h1 className="font-serif font-bold text-4xl md:text-6xl text-emerald-900">
                    Projects
                </h1>
            </div>

            <div className="px-4 md:px-16 lg:px-24 pb-44 md:pb-72">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            ref={(el) => (cardRefs.current[index] = el)}
                            className="bg-white rounded-xl shadow-md p-5 border-2 border-transparent hover:border-emerald-400 hover:shadow-xl transition-all duration-300 flex flex-col"
                        >
                            <h2 className="font-bold text-lg text-emerald-900 mb-2">
                                {project.title}
                            </h2>
                            <p className="text-sm text-gray-700 leading-relaxed mb-4 flex-grow">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-1 mb-4">
                                {project.tech.map((t) => (
                                    <span
                                        key={t}
                                        className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-3">
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-semibold text-white bg-gray-800 px-3 py-1 rounded-full hover:bg-gray-600 transition-colors"
                                    >
                                        GitHub
                                    </a>
                                )}
                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-semibold text-white bg-emerald-700 px-3 py-1 rounded-full hover:bg-emerald-500 transition-colors"
                                    >
                                        View
                                    </a>
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

export default ProjectsView;
