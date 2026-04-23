
// Project Interface (Landing Page)
export interface ProjectInterface0 {
    id: string;
    slug: string;
    title: string;
    image: string | null;
    shortDesc: string;
    longDesc?: string;
    technologies: string[]
}

type ID = string;

export interface ProjectInterface {
    id?: ID;
    slug: string;
    title: string;
    mainImage: string;
    mainImageFileId: string | null;
  
    shortDescription: string;
    description: string;
  
    category: "frontend" | "backend" | "fullstack";
  
    githubUrl: string | null;
    liveUrl: string | null;
  
    isFeatured: boolean;
    isPublished: boolean;
  
    startDate: string | null;
    endDate: string | null;
  
    client: string | null;
    teamSize: number | null;

    projectImages?: {
        imageUrl: string;
        fileId: string | null;
      }[];
    
    technologies: {
        id: number;
      }[];
  };

  // Project Cards Interface 
  export interface ProjectCard {
    id: string;
    slug: string;
    title: string;
    mainImage: string;
    shortDescription: string;
    category: string;
    githubUrl: string | null;
    liveUrl: string | null;
    technologies: string[];
  };