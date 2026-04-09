
// Project Interface (Landing Page)
export interface ProjectInterface {
    id: string;
    slug: string;
    title: string;
    image: string | null;
    shortDesc: string;
    longDesc?: string;
    technologies: string[]
}