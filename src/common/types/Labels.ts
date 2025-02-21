interface SocialLabel {
    name: string;
    url: string;
}
interface LanguageLabel {
    name: string;
    degree: string;
}
interface EducationLabel {
    name: string;
    faculty: string;
    specialization: string;
    degree: string;
    dataStart: string;
    dataEnd: string;
}
interface CourseLabel {
    name: string;
    dataStart: string;
    dataEnd: string;
}
interface ProjectLabel {
    description: string;
    tasks: string[];
    stack: string[];
    dataStart: string;
    dataEnd: string;
}
interface PositionLabel {
    name: string;
    projects: ProjectLabel[];
}
export interface FormData {
    name: string;
    lastName: string;
    email: string;
    telephone: string;
    aboutMe: string;
    technicalSkills: string[];
    socialLabels: SocialLabel[];
    languageLabels: LanguageLabel[];
    educationLabels: EducationLabel[];
    courseLabels: CourseLabel[];
    positionLabels: PositionLabel[];
}
