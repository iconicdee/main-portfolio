"use client";

import FormControls from "../formcontrols";

const controls = [
  {
    name: "heading",
    placeholder: "Enter heading text",
    type: "text",
    label: "Enter Career summary",
  },
  {
    name: "summary",
    placeholder: "Enter career summary ",
    type: "text",
    label: "Enter heading text",
  },
];

export default function AdmiHomeView({
  formData,
  setFormData,
  handleSaveData,
  data,
}) {
  return (
    <div className="w-full">
      <div className="mb-10">
        {data && data.length
          ? data.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 border p-4 border-green-600"
              >
                <p>{item.heading}</p>
                <p>{item.summary}</p>
              </div>
            ))
          : null}
      </div>
      <div className="bg-[#ffffff] shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <FormControls
          controls={controls}
          formData={formData}
          setFormData={setFormData}
        />
        <button
          onClick={() => handleSaveData("home")}
          className="border border-green-600 p-4 fo"
        >
          Add Info
        </button>
      </div>
    </div>
  );
}
