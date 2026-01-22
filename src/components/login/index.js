"use client";
import FormControls from "../admin/formcontrols";

const controls = [
  {
    name: "username",
    placeholder: "Enter User name",
    type: "text",
    label: "Enter User name",
  },
  {
    name: "password",
    placeholder: "Enter password",
    type: "text",
    label: "Enter password",
  },
];

export default function Login({ formData, setFormData, handleLogin }) {
  return (
    <div className="bg-[#ffffff] shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <FormControls
        controls={controls}
        formData={formData}
        setFormData={setFormData}
      />
      <button onClick={handleLogin} className="border border-green-600 p-4 fo">
        Login
      </button>
    </div>
  );
}
