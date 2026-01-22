"use client";

import { useRef, useMemo } from "react";
import AnimationWrapper from "../animation-cover";
import { motion, useScroll } from "framer-motion";
import { useRouter } from "next/navigation";

function variants() {
  return {
    offscreen: {
      y: 150,
      opacity: 0,
    },
    onscreen: ({ duration = 2 } = {}) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration,
      },
    }),
  };
}

const cardVariants = {
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1.5,
    },
  },
};

export default function ClientProjectView({ data }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const setVariants = useMemo(() => variants(), []);

  const router = useRouter();

  return (
    <div
      className="max-w-screen-xl mt-24 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto"
      id="project"
    >
      <AnimationWrapper className="py-6 sm:py-16">
        <div className="flex flex-col justify-center items-center text-center">
          <h1 className="leading-tight mb-6 text-3xl lg:text-4xl xl:text-5xl font-bold">
            {"My Projects".split(" ").map((item, index) => (
              <span
                key={index}
                className={`${index === 1 ? "text-green-main" : "text-[#000]"}`}
              >
                {item}{" "}
              </span>
            ))}
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mb-8">
            Explore my recent work and projects
          </p>
          <svg
            id="progress"
            width={80}
            height={80}
            viewBox="0 0 100 100"
            className="mb-4"
          >
            <circle
              cx="50"
              cy="50"
              r="30"
              pathLength="1"
              className="stroke-gray-200 fill-none"
              strokeWidth="4"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="30"
              pathLength="1"
              className="stroke-green-main fill-none"
              strokeWidth="4"
              strokeLinecap="round"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
        </div>
      </AnimationWrapper>

      <AnimationWrapper>
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          ref={containerRef}
        >
          {data && data.length
            ? data.map((item, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: 0.3 }}
                  className="group"
                >
                  <div className="bg-white border-2 border-gray-200 hover:border-green-main rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col">
                    {/* Project Header */}
                    <div className="p-6 border-b border-gray-100">
                      <h3 className="text-2xl lg:text-3xl text-gray-900 font-bold mb-2 group-hover:text-green-main transition-colors">
                        {item.projectname}
                      </h3>
                      <p className="text-sm text-gray-500 font-medium flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {new Date(item.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div className="p-6 flex-grow">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {item?.technologies
                          .split(",")
                          .map((techItem, techIndex) => (
                            <span
                              key={techIndex}
                              className="inline-flex items-center px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-700 font-medium rounded-full text-xs hover:bg-green-50 hover:border-green-main hover:text-green-700 transition-all cursor-default"
                            >
                              {techItem.trim()}
                            </span>
                          ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-6 pt-0 flex gap-3">
                      <button
                        onClick={() => router.push(item.websites)}
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-green-main text-white font-semibold text-sm rounded-lg hover:bg-green-600 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg outline-none"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                          />
                        </svg>
                        Website
                      </button>
                      <button
                        onClick={() => router.push(item.github)}
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gray-900 text-white font-semibold text-sm rounded-lg hover:bg-gray-800 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg outline-none"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                        GitHub
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            : null}
        </div>
      </AnimationWrapper>
    </div>
  );
}
