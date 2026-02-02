import ClientAboutView from "@/components/client-view/about-view";
import ClientContactView from "@/components/client-view/contact-view";
import ClientExperienceView from "@/components/client-view/experience-view";
import ClientHomeView from "@/components/client-view/home-view";
import ClientProjectView from "@/components/client-view/project-view";

async function extractAllDatas({ currentSection }) {
  const res = await fetch(`/api/${currentSection}/get`, {
    method: "GET",
    cache: "no-store",
  });

  const data = await res.json();

  return data && data.data;
}

export default async function Home() {
  const homeSectionData = await extractAllDatas({ currentSection: "home" });
  const aboutSectionData = await extractAllDatas({ currentSection: "about" });
  const experienceSectionData = await extractAllDatas({
    currentSection: "experience",
  });
  const projectSectionData = await extractAllDatas({
    currentSection: "project",
  });
  const educationSectionData = await extractAllDatas({
    currentSection: "education",
  });

  return (
    <div>
      <ClientHomeView data={homeSectionData} />
      <ClientAboutView
        data={
          aboutSectionData && aboutSectionData.length ? aboutSectionData[0] : []
        }
      />

      <ClientExperienceView
        experienceData={experienceSectionData}
        educationData={educationSectionData}
      />

      <ClientProjectView data={projectSectionData} />
      <ClientContactView />
    </div>
  );
}
