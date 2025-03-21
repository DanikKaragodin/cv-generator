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
interface PositionLabel {
    name: string;
    description: string;
    tasks: string[];
    stack: string[];
    dataStart: string;
    dataEnd: string;
}
export interface FormData {
    id: string;
    CVname: string;
    name: string;
    lastName: string;
    email: string;
    telephone: string;
    aboutMe: string;
    avatar: File | string;
    technicalSkills: string[];
    socialLabels: SocialLabel[];
    languageLabels: LanguageLabel[];
    educationLabels: EducationLabel[];
    courseLabels: CourseLabel[];
    positionLabels: PositionLabel[];
}
