import ViewFooter from "./ViewFooter";
import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import posts from "../../content/blog/posts.json";

const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

const PostBody = ({ body }) =>
    body.split("\n\n").map((para, i) => (
        <p key={i} className="text-gray-700 leading-relaxed mb-4 text-sm md:text-base">
            {para}
        </p>
    ));

const BlogView = () => {
    const [selectedPost, setSelectedPost] = useState(null);
    const listRef = useRef([]);
    const detailRef = useRef();

    useGSAP(() => {
        if (selectedPost === null) {
            gsap.set(listRef.current, { opacity: 0, y: 30 });
            gsap.to(listRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.1,
                ease: "power2.out",
                delay: 0.1,
            });
        } else {
            gsap.fromTo(
                detailRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
            );
        }
    }, [selectedPost]);

    return (
        <div className="min-h-screen w-full bg-rose-50">
            <div className="text-center py-8">
                <h1 className="font-serif font-bold text-4xl md:text-6xl text-rose-900">
                    Blog
                </h1>
            </div>

            <div className="px-4 md:px-16 lg:px-24 pb-44 md:pb-72">
                <div className="max-w-3xl mx-auto">
                    {selectedPost === null ? (
                        /* Post list */
                        <div className="flex flex-col gap-4">
                            {posts.map((post, index) => (
                                <button
                                    key={post.id}
                                    ref={(el) => (listRef.current[index] = el)}
                                    onClick={() => setSelectedPost(post)}
                                    className="text-left bg-white rounded-xl shadow-md p-5 border-2 border-transparent hover:border-rose-400 hover:shadow-xl transition-all duration-300 w-full"
                                >
                                    <div className="flex justify-between items-start gap-4">
                                        <div>
                                            <h2 className="font-bold text-lg text-rose-900 mb-1">
                                                {post.title}
                                            </h2>
                                            <p className="text-sm text-gray-600">
                                                {post.summary}
                                            </p>
                                        </div>
                                        <span className="text-xs text-gray-400 whitespace-nowrap pt-1">
                                            {formatDate(post.date)}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        /* Post detail */
                        <div ref={detailRef}>
                            <button
                                onClick={() => setSelectedPost(null)}
                                className="text-sm font-semibold text-rose-700 hover:text-rose-500 mb-6 flex items-center gap-1"
                            >
                                ← Back to posts
                            </button>
                            <div className="bg-white rounded-xl shadow-md p-6 border border-rose-100">
                                <h2 className="font-bold text-2xl md:text-3xl text-rose-900 mb-2">
                                    {selectedPost.title}
                                </h2>
                                <p className="text-sm text-gray-400 mb-6">
                                    {formatDate(selectedPost.date)}
                                </p>
                                <PostBody body={selectedPost.body} />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <ViewFooter />
        </div>
    );
};

export default BlogView;
