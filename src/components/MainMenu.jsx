import EmptyChannel from "./EmptyChannel";
import DiscChannel from "./DiscChannel";
import BannerChannel from "./BannerChannel";
import githubSvg from "../assets/svgs/github.svg";
import linkedinSvg from "../assets/svgs/linkedin.svg";
import starSvg from "../assets/svgs/star.svg";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import CodeChannel from "./CodeChannel";
import TechnologiesChannel from "./TechnologiesChannel";
import MmFooter from "./MmFooter";
import MmFooterMobile from "./MmFooterMobile";
import WorkExperienceChannel from "./WorkExperienceChannel";
import ProjectsChannel from "./ProjectsChannel";
import ResearchChannel from "./ResearchChannel";
import BlogChannel from "./BlogChannel";
import EducationChannel from "./EducationChannel";
import links from "../../content/links.json";

export default function MainMenu() {
    const isMdOrLarger = useMediaQuery({ minWidth: 768 });

    return (
        <div className="mm-striped-bg bg-gray-100 min-h-screen flex flex-col fade-in">
            <div className="flex-grow md:h-[100vh] md:overflow-auto md:pb-0 pb-20">
                <div className="md:flex flex-wrap xl:px-32 md:pt-4 p-3 pt-14 justify-center md:pb-24">
                    {/* Row 1: personal profile */}
                    <Link to={"/about-me"} className="md:w-1/4 md:p-[0.4vh]">
                        <DiscChannel />
                    </Link>
                    <Link to={"/work-experience"} className="md:w-1/4 md:p-[0.4vh]">
                        <WorkExperienceChannel />
                    </Link>
                    <Link to={"/technologies-view"} className="md:w-1/4 md:p-[0.4vh]">
                        <TechnologiesChannel />
                    </Link>
                    <Link to={"/education"} className="md:w-1/4 md:p-[0.4vh]">
                        <EducationChannel />
                    </Link>

                    {/* Row 2: content */}
                    <Link to={"/projects"} className="md:w-1/4 md:p-[0.4vh]">
                        <ProjectsChannel />
                    </Link>
                    <Link to={"/research"} className="md:w-1/4 md:p-[0.4vh]">
                        <ResearchChannel />
                    </Link>
                    <Link to={"/blog"} className="md:w-1/4 md:p-[0.4vh]">
                        <BlogChannel />
                    </Link>
                    <Link
                        to={links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="md:w-1/4 md:p-[0.4vh]"
                    >
                        <BannerChannel
                            image={linkedinSvg}
                            legend={"LinkedIn Profile"}
                            classes={"animate-pulse"}
                        />
                    </Link>

                    {/* Row 3: links */}
                    <Link
                        to={links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="md:w-1/4 md:p-[0.4vh]"
                    >
                        <BannerChannel
                            image={githubSvg}
                            legend={"Github Profile"}
                            classes={"animate-bounce"}
                        />
                    </Link>
                    <Link
                        to={links.featuredProject.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="md:w-1/4 md:p-[0.4vh]"
                    >
                        <BannerChannel
                            image={starSvg}
                            legend={"Featured Project"}
                            classes={"animate-spin-slower"}
                        />
                    </Link>
                    <Link
                        to={links.sourceRepo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="md:w-1/4 md:p-[0.4vh]"
                    >
                        <CodeChannel />
                    </Link>
                    {isMdOrLarger && (
                        <div className="md:w-1/4 md:p-[0.4vh]">
                            <EmptyChannel />
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-auto">
                {isMdOrLarger ? <MmFooter /> : <MmFooterMobile />}
            </div>
        </div>
    );
}
