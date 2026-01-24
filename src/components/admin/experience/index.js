"use client";
import FormControls from "../formcontrols";

const controls = [
  {
    name: "position",
    placeholder: "position",
    type: "text",
    label: "position",
  },
  {
    name: "company",
    placeholder: "Company",
    type: "text",
    label: "Company",
  },
  {
    name: "duration",
    placeholder: "Duration",
    type: "text",
    label: "Duration",
  },
];

export default function AdminExperienceView({
  formData,
  setFormData,
  handleSaveData,
  data,
}) {
  return (
    <div>
      <div className="mb-10">
        {data && data.length
          ? data.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 border p-4 border-green-600"
              >
                <p>{item.position}</p>
                <p>{item.company}</p>
                <p>{item.duration}</p>
                <p>{item.location}</p>
                <p>{item.jobprofile}</p>
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
          onClick={() => handleSaveData("experience")}
          className="border border-green-600 p-4 fo"
        >
          Add Info
        </button>
      </div>
    </div>
  );
}
