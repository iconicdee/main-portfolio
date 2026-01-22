"use client";

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

export default function FormControls({ controls, formData, setFormData }) {
  return controls.map((item) => (
    <div key={item.name} className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {item.label}
      </label>
      <input
        placeholder={item.placeholder}
        type={item.type}
        name={item.name}
        id={item.id || item.name}
        value={formData?.[item.name] ?? ""}
        onChange={(e) => {
          setFormData((prev) => ({
            ...prev,
            [item.name]: e.target.value,
          }));
        }}
        className="shadow border rounded w-full py-2 px-3 text-gray-700 tracking-wide focus:outline-none focus:shadow-outline"
      />
    </div>
  ));
}
