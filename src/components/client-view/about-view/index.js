"use client";

import AnimationWrapper from "../animation-cover";
import { motion } from "framer-motion";
import { useMemo } from "react";
import Image from "next/image";
import aboutMeImage from "../../../assets/about-image.png";

function variants() {
  return {
    offscreen: {
      y: 150,
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

const headingText = "Why Hire Me For Your Next Project ?";

const skillItemVariant = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function ClientAboutView({ data }) {
  console.log(data);
  const setVariants = useMemo(() => variants(), []);
  const aboutDataInfo = [
    {
      label: "Experience",
      value: data?.yearofexperience || "0",
    },
    {
      label: "Client",
      value: data?.noofclient || "0",
    },
    {
      label: "Project",
      value: data?.noofproject || "0",
    },
  ];

  return (
    <div
      className="max-w-screen-xl mt-24 mb-6 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto"
      id="about"
    >
      <AnimationWrapper className="rounded-lg w-full grid-flow-row grid grid-cols-1 sm:grid-cols-3 py-6 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-green-main bg-white-500 z-20">
        {aboutDataInfo.map((infoItem, index) => (
          <motion.div
            key={index}
            className={`flex items-center ${
              index === 0
                ? "sm:justify-start"
                : index === 1
                ? "sm:justify-center"
                : "sm:justify-end"
            } py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0`}
            custom={{ duration: 2 + index }}
            variants={setVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="flex m-0 w-40 sm:w-auto">
              <div className="flex flex-col">
                <p className="text-[50px] text-green-main font-bold">
                  {infoItem.value}+
                </p>
                <p className="text-[25px] font-bold text-[#000000]">
                  {infoItem.label}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimationWrapper>
      <AnimationWrapper className={"pt-6"}>
        <div className="flex flex-col justify-center items-center row-starts-2 sm:row-start-1">
          <h1 className="leading-[70px] mb-4 text-3xl lg:text-4xl xl:text-5xl font-medium">
            {headingText.split(" ").map((item, index) => (
              <span
                key={index}
                className={`${index === 6 ? "text-green-main" : "text-[#000]"}`}
              >
                {item}{" "}
              </span>
            ))}
          </h1>
          <p className="text-[#000] mt-4 mb-8 font-bold mx-auto">
            {data?.aboutme}{" "}
          </p>
        </div>
      </AnimationWrapper>
      <div className="py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <AnimationWrapper className="w-full">
          <motion.div
            variants={setVariants}
            className="w-full max-w-[500px] mx-auto"
          >
            <Image
              src={aboutMeImage}
              alt="About Me"
              layout="responsive"
              height={418}
              width={500}
              quality={100}
              className="rounded-lg"
            />
          </motion.div>
        </AnimationWrapper>
        <AnimationWrapper className="w-full">
          <motion.div
            variants={setVariants}
            className="grid gap-4 grid-cols-2 lg:grid-cols-3"
          >
            {data?.skills.split(",").map((skill, index) => (
              <motion.div
                variants={skillItemVariant}
                key={index}
                className="flex justify-center items-center"
              >
                <button className="w-full text-center py-3 px-3 border-[2px] border-green-main bg-[#fff] text-[#000] font-semibold rounded-lg text-xs sm:text-sm lg:text-base tracking-wide hover:shadow-green-main transition-all outline-none truncate">
                  {skill}
                </button>
              </motion.div>
            ))}
          </motion.div>
        </AnimationWrapper>
      </div>
    </div>
  );
}
