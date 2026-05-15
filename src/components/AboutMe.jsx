import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import ViewFooter from "./ViewFooter";
import avatarSvg from "../assets/svgs/avatar.svg";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import about from "../../content/about.json";

const AboutMe = () => {
    const avatarRef = useRef();
    const frameRef = useRef();
    const textRef = useRef();
    const startRef = useRef();

    const isTallerThan700 = useMediaQuery({ minHeight: 700 });

    useGSAP(() => {
        gsap.from(avatarRef.current, {
            opacity: 0,
            scale: 0,
            duration: 1,
            ease: "elastic.out(1, 0.5)",
        });

        gsap.to(frameRef.current, {
            rotation: 360,
            repeat: -1,
            duration: 2,
            ease: "linear",
            transformOrigin: "50% 50%",
        });

        gsap.from(textRef.current, {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: 0.5,
            stagger: 0.3,
            ease: "power2.out",
        });

        gsap.from(startRef.current, {
            opacity: 0.2,
            scale: 1.5,
            duration: 0.2,
            repeat: -1,
            yoyo: true,
            ease: "power.out",
            delay: 0.8,
        });
    });

    return (
        <div className="min-h-screen w-full bg-gradient-to-r from-orange-100 to-orange-200">
            <div className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 pt-16 pb-44 md:pb-72">
                {/* Avatar with rotating frame */}
                <div className="relative mb-4 sm:mb-8 flex justify-center items-center">
                    <div
                        ref={frameRef}
                        className={`absolute w-24 h-24 sm:w-32 sm:h-32 ${
                            isTallerThan700
                                ? "md:w-[16vw] md:h-[16vw]"
                                : "md:w-[23vh] md:h-[23vh]"
                        } rounded-full border-t-4 border-orange-600 flex justify-center items-center`}
                    >
                        {" "}
                    </div>
                    <img
                        src={avatarSvg}
                        alt="avatar"
                        className={`${
                            isTallerThan700 ? "md:w-[14vw]" : "md:w-[20vh]"
                        } w-16 sm:w-24 rounded-full shadow-lg`}
                        ref={avatarRef}
                    />
                </div>

                {/* Bio text */}
                <div
                    className="text-center font-serif font-semibold text-gray-700 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32"
                    ref={textRef}
                >
                    <p className="text-lg sm:text-xl md:text-[2vw] mb-2 sm:mb-4 md:mb-6 leading-relaxed">
                        Hi! My name is{" "}
                        <span className="text-orange-600 animate-pulse">
                            {about.name}
                        </span>
                        , {about.title}.
                    </p>
                    <p className="text-base sm:text-lg md:text-[1.5vw] mb-2 sm:mb-4 md:mb-6 leading-relaxed">
                        {about.homeIntro}
                    </p>
                    <ul className="text-base sm:text-lg md:text-[1.3vw] mb-2 sm:mb-4 md:mb-6 leading-relaxed list-none space-y-1">
                        {about.highlights.map((h, i) => (
                            <li key={i} className="text-blue-700">
                                — {h}
                            </li>
                        ))}
                    </ul>
                    <p className="text-lg sm:text-xl md:text-[2vw] pt-3">
                        <span
                            className="text-slate-600 sm:text-2xl md:text-[2.8vw] font-rodin font-bold animate-pulse"
                            ref={startRef}
                        >
                            Press &quot;Start&quot; to view my Resume.
                        </span>
                    </p>
                </div>
            </div>

            <ViewFooter />
        </div>
    );
};

export default AboutMe;
