interface SocialLink {
    name: string;
    url: string;
}
interface LanguageLink {
    name: string;
    degree: string;
}
interface EducationLink {
    name: string;
    faculty: string;
    specialization: string;
    degree: string;
    dataStart: string;
    dataEnd: string;
}
interface CourseLink {
    name: string;
    dataStart: string;
    dataEnd: string;
}
interface ProjectLink {
    description: string;
    tasks: string[];
    stack: string[];
    dataStart: string;
    dataEnd: string;
}
interface PositionLink {
    name: string;
    projects: ProjectLink[];
}
export interface FormData {
    name: string;
    lastName: string;
    email: string;
    telephone: string;
    aboutMe: string;
    technicalSkills: string[];
    socialLinks: SocialLink[];
    languageLinks: LanguageLink[];
    educationLinks: EducationLink[];
    courseLinks: CourseLink[];
    positionLinks: PositionLink[];
}
