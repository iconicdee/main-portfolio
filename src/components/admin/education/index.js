"use client";
import FormControls from "../formcontrols";

const controls = [
  {
    name: "degree",
    placeholder: "degree Name",
    type: "text",
    label: "Enter Degree Name",
  },
  {
    name: "year",
    placeholder: "Year",
    type: "text",
    label: "Year",
  },
  {
    name: "college",
    placeholder: "College Name",
    type: "text",
    label: "Enter College Name",
  },
];

export default function AdminEducationView({
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
                <p>{item.degree}</p>
                <p>{item.year}</p>
                <p>{item.college}</p>
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
          onClick={() => handleSaveData("education")}
          className="border border-green-600 p-4 fo"
        >
          Add Info
        </button>
      </div>
    </div>
  );
}
