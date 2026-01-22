"use client";
import AdmiHomeView from "@/components/admin/home";
import AdminAboutView from "@/components/admin/about";
import AdminEducationView from "@/components/admin/education";
import AdminExperienceView from "@/components/admin/experience";
import AdminContactView from "@/components/admin/contact";
import AdminProjectView from "@/components/admin/project";
import { useEffect, useState } from "react";
import { addData, getData, updateData, login } from "@/services";
import Login from "@/components/login";

const initialHomeData = {
  heading: "",
  summary: "",
};

const initialAboutData = {
  noofproject: "",
  yearofexperience: "",
  noofclient: "",
  aboutme: "",
};

const initialEducationData = {
  degree: "",
  year: "",
  college: "",
};

const initialExperienceData = {
  position: "",
  company: "",
  duration: "",
};

const initialProjectData = {
  projectname: "",
  technologies: "",
  websites: "",
  github: "",
};

const initialLoginFormData = {
  username: "",
  password: "",
};

export default function AdminView() {
  const [currentSelectedTab, setCurrentSelectedTab] = useState("home");
  const [homeData, setHomeData] = useState(initialHomeData);
  const [aboutData, setAboutData] = useState(initialAboutData);
  const [educationData, setEducationData] = useState(initialEducationData);
  const [experienceData, setExperienceData] = useState(initialExperienceData);
  const [projectData, setProjectData] = useState(initialProjectData);
  const [allData, setAllData] = useState({});
  const [update, setUpdate] = useState(false);
  const [authUser, setAuthUser] = useState(false);
  const [loginFormData, setLoginFormData] = useState(initialLoginFormData);

  const menuItem = [
    {
      id: "home",
      label: "Home",
      Component: (
        <AdmiHomeView
          formData={homeData}
          setFormData={setHomeData}
          handleSaveData={handleSaveData}
          data={allData?.home}
        />
      ),
    },
    {
      id: "about",
      label: "About",
      Component: (
        <AdminAboutView
          formData={aboutData}
          setFormData={setAboutData}
          handleSaveData={handleSaveData}
          data={allData?.about}
        />
      ),
    },
    {
      id: "education",
      label: "Education",
      Component: (
        <AdminEducationView
          formData={educationData}
          setFormData={setEducationData}
          handleSaveData={handleSaveData}
          data={allData?.education}
        />
      ),
    },
    {
      id: "experience",
      label: "Experience",
      Component: (
        <AdminExperienceView
          formData={experienceData}
          setFormData={setExperienceData}
          handleSaveData={handleSaveData}
          data={allData?.experience}
        />
      ),
    },
    {
      id: "project",
      label: "Project",
      Component: (
        <AdminProjectView
          formData={projectData}
          setFormData={setProjectData}
          handleSaveData={handleSaveData}
          data={allData?.project}
        />
      ),
    },
    {
      id: "contact",
      label: "Contact",
      Component: <AdminContactView />,
    },
  ];

  async function extractAllDatas() {
    const data = await getData(currentSelectedTab);
    console.log(data);
    if (data?.success) {
      setAllData({
        ...allData,
        [currentSelectedTab]: data && data.data,
      });
    }

    if (
      currentSelectedTab === "home" &&
      data &&
      data.data &&
      data.data.length
    ) {
      setHomeData(data && data.data[0]);
      setUpdate(true);
    }

    if (
      currentSelectedTab === "about" &&
      data &&
      data.data &&
      data.data.length
    ) {
      setAboutData(data && data.data[0]);
      setUpdate(true);
    }
  }

  async function handleSaveData() {
    const dataMap = {
      home: homeData,
      about: aboutData,
      education: educationData,
      experience: experienceData,
      project: projectData,
    };
    setAllData((prev) => ({
      ...prev,
      [currentSelectedTab]: dataMap[currentSelectedTab],
    }));
    const payload = dataMap[currentSelectedTab];
    console.log("payload", payload);
    const response = update
      ? await updateData(currentSelectedTab, payload)
      : await addData(currentSelectedTab, payload);
    console.log("response", response);

    if (response.success) {
      extractAllDatas();
      resetFormDatas();
    }
  }

  useEffect(() => {
    extractAllDatas();
  }, [currentSelectedTab]);

  function resetFormDatas() {
    setHomeData(initialHomeData),
      setAboutData(initialAboutData),
      setEducationData(initialEducationData),
      setExperienceData(initialExperienceData);
    setProjectData(initialProjectData);
  }

  console.log(allData, homeData, aboutData);

  useEffect(() => {
    setAuthUser(JSON.parse(sessionStorage.getItem("authUser")));
  }, []);

  async function handleLogin() {
    console.log("inside handle login");
    try {
      const response = await login(loginFormData);

      console.log(response);

      if (response?.success) {
        setAuthUser(true);
        sessionStorage.setItem("authUser", JSON.stringify(true));
      }
    } catch (e) {
      console.log(e);
    }
  }

  if (!authUser)
    return (
      <Login
        formData={loginFormData}
        setFormData={setLoginFormData}
        handleLogin={handleLogin}
      />
    );

  return (
    <div className="border-b border-gray-200">
      <nav
        className="-mb-0.5 flex justify-center items-center space-x-6"
        role="tablist"
      >
        {menuItem.map((item) => (
          <button
            key={item.id}
            type="button"
            className="p-4 font-bold text-xl text-black"
            onClick={() => {
              setCurrentSelectedTab(item.id);
              resetFormDatas();
              setUpdate(false);
            }}
          >
            {item.label}
          </button>
        ))}
        <button
          className="p-4 font-bold text-xl text-black"
          onClick={() => {
            setAuthUser(false), sessionStorage.removeItem("authUser");
          }}
        >
          LogOut
        </button>
      </nav>
      <div className="mt-10 p-10">
        {menuItem.map((item) =>
          item.id === currentSelectedTab ? (
            <div key={item.id}>{item.Component}</div>
          ) : null
        )}
      </div>
    </div>
  );
}
