"use client";
import FormControls from "../formcontrols";

const controls = [
  {
    name: "aboutme",
    placeholder: "about me",
    type: "text",
    label: "about me",
  },
  {
    name: "yearofexperience",
    placeholder: "year of experience",
    type: "text",
    label: "Enter year of experience",
  },
  {
    name: "noofclient",
    placeholder: "No of clients",
    type: "text",
    label: "Enter no of clients",
  },
  {
    name: "noofproject",
    placeholder: "No of projects",
    type: "text",
    label: "Enter no of projects",
  },
  {
    name: "skills",
    placeholder: "No of skills",
    type: "text",
    label: "Enter no of skills",
  },
];

export default function AdminAboutView({
  formData,
  setFormData,
  handleSaveData,
  data,
}) {
  return (
    <div className="w-full">
      <div className="mb-10">
        {data && data.length
          ? data.map((item) => (
              <div
                key={item._id}
                className="flex flex-col gap-4 border p-4 border-green-600"
              >
                <p>{item.yearofexperience}</p>
                <p>{item.noofclient}</p>
                <p>{item.noofproject}</p>
                <p>{item.aboutme}</p>
                <p>{item.skills}</p>
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
          onClick={handleSaveData}
          className="border border-green-600 p-4"
        >
          Add Info
        </button>
      </div>
    </div>
  );
}
