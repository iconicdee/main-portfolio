"use client";

import { useEffect, useState } from "react";
import AnimationWrapper from "../animation-cover";
import { addData } from "@/services";

const controls = [
  {
    name: "name",
    placeholder: "Enter your name",
    type: "text",
    label: "Name",
    validation: (value) =>
      value.trim().length >= 2 || "Name must be at least 2 characters",
  },
  {
    name: "email",
    placeholder: "Enter your email",
    type: "email",
    label: "Email",
    validation: (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Please enter a valid email",
  },
  {
    name: "message",
    placeholder: "Enter your message",
    type: "text",
    label: "Message",
    validation: (value) =>
      value.trim().length >= 10 || "Message must be at least 10 characters",
  },
];

const initialFormData = {
  name: "",
  email: "",
  message: "",
};

const initialErrors = {
  name: "",
  email: "",
  message: "",
};

export default function ClientContactView() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSendMessage() {
    // Validate all fields
    const newErrors = {};
    controls.forEach((control) => {
      const validation = control.validation(formData[control.name]);
      if (validation !== true) {
        newErrors[control.name] = validation;
      }
    });

    setErrors(newErrors);

    // If there are errors, don't submit
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await addData("contact", formData);
      console.log(res, "contact-res");

      if (res && res.success) {
        setFormData(initialFormData);
        setErrors(initialErrors);
        setShowSuccessMessage(true);
      } else {
        setErrorMessage("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const isValidForm = () => {
    return (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.message.trim() !== "" &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    );
  };

  return (
    <div
      className="max-w-screen-xl mt-24 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto"
      id="contact"
    >
      <AnimationWrapper className="py-6 sm:py-12">
        <div className="flex flex-col justify-center items-center text-center">
          <h1 className="leading-tight mb-4 text-3xl lg:text-4xl xl:text-5xl font-bold">
            {"Contact Me".split(" ").map((item, index) => (
              <span
                key={index}
                className={`${index === 1 ? "text-green-main" : "text-[#000]"}`}
              >
                {item}{" "}
              </span>
            ))}
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mt-2">
            Have a question or want to work together? Drop me a message!
          </p>
        </div>
      </AnimationWrapper>

      <AnimationWrapper>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 lg:p-10">
            <div className="space-y-6">
              {controls.map((controlItem) =>
                controlItem.name === "message" ? (
                  <div key={controlItem.name} className="w-full">
                    <label
                      htmlFor={controlItem.name}
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      {controlItem.label}
                    </label>
                    <textarea
                      id={controlItem.name}
                      name={controlItem.name}
                      placeholder={controlItem.placeholder}
                      value={formData[controlItem.name]}
                      onChange={handleInputChange}
                      rows={5}
                      className={`w-full border-2 ${
                        errors[controlItem.name]
                          ? "border-red-500 focus:border-red-600"
                          : "border-gray-200 focus:border-green-main"
                      } bg-white rounded-lg text-base outline-none text-gray-900 py-3 px-4 resize-none leading-relaxed transition-colors duration-200 hover:border-gray-300`}
                    ></textarea>
                    {errors[controlItem.name] && (
                      <p className="text-red-600 text-xs font-medium mt-1">
                        {errors[controlItem.name]}
                      </p>
                    )}
                  </div>
                ) : (
                  <div key={controlItem.name} className="w-full">
                    <label
                      htmlFor={controlItem.name}
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      {controlItem.label}
                    </label>
                    <input
                      type={controlItem.type}
                      id={controlItem.name}
                      name={controlItem.name}
                      placeholder={controlItem.placeholder}
                      value={formData[controlItem.name]}
                      onChange={handleInputChange}
                      className={`w-full border-2 ${
                        errors[controlItem.name]
                          ? "border-red-500 focus:border-red-600"
                          : "border-gray-200 focus:border-green-main"
                      } bg-white rounded-lg text-base outline-none text-gray-900 py-3 px-4 leading-relaxed transition-colors duration-200 hover:border-gray-300`}
                    />
                    {errors[controlItem.name] && (
                      <p className="text-red-600 text-xs font-medium mt-1">
                        {errors[controlItem.name]}
                      </p>
                    )}
                  </div>
                )
              )}

              {showSuccessMessage && (
                <div className="bg-green-50 border-l-4 border-green-main rounded-lg p-4 animate-pulse">
                  <p className="text-green-800 font-semibold text-sm sm:text-base flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Your message has been successfully delivered!
                  </p>
                </div>
              )}

              {errorMessage && (
                <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
                  <p className="text-red-800 font-semibold text-sm sm:text-base flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errorMessage}
                  </p>
                </div>
              )}

              <div className="pt-4">
                <button
                  disabled={!isValidForm() || isLoading}
                  onClick={handleSendMessage}
                  className="w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed py-3 px-8 sm:py-4 sm:px-12 text-white font-bold rounded-lg text-base sm:text-lg tracking-wide bg-green-main hover:bg-green-600 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg outline-none flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </AnimationWrapper>
    </div>
  );
}
