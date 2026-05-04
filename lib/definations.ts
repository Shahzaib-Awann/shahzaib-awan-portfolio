import { SerializedEditorState } from "lexical";


export type Categories = "frontend" | "backend" | "fullstack";

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
    coverImageUrl: string;
    coverImageFileId?: string | null;
    // coverImageFileId?: string | null;
  
    shortSummary: string;
    fullDescription: string;
  
    category: Categories;
  
    githubUrl: string | null;
    liveUrl: string | null;
  
    isFeatured: boolean;
    isPublished: boolean;
  
    startDate: string | null;
    endDate: string | null;
  
    client: string | null;
    teamSize: number | null;

    galleryImages?: {
        imageUrl: string;
        fileId: string | null;
      }[];
    
    technologies: {
        id: number;
      }[];

    createdAt?: string;
    updateAt?: string;
  };

  // Project Cards Interface 
  export interface ProjectCard {
    id: string;
    slug: string;
    title: string;
    coverImage: string;
    shortSummary: string;
    category: string;
    githubUrl: string | null;
    liveUrl: string | null;
    technologies: string[];
  };

  export interface ProjectImage {
    url: string;
    fileId: string;
  }
  
  export interface ProjectTechnology {
    id: number;
  }
  
  export interface Project {
    id: string;
    slug: string;
    title: string;
    mainImage: string;
    mainImageFileId: string;
    shortDescription: string;
    description: string;
    category: Categories; // adjust if needed
    githubUrl: string;
    liveUrl: string;
    isFeatured: boolean;
    isPublished: boolean;
    startDate: string; // or Date if you convert it
    endDate: string;   // or Date
    client: string;
    teamSize: number;
    createdAt: Date;
    updatedAt: Date;
  
    projectImages: ProjectImage[];
    technologies: ProjectTechnology[];
  }

  export interface ProjectDetailViewInterface {
    id: string;
    slug: string;
  
    coverImage: string;
    title: string;
    shortSummary: string;
    fullDescription: SerializedEditorState; // replace with your Lexical type if available
  
    category: Categories;
  
    githubUrl: string | null;
    liveUrl: string | null;
  
    isFeatured: boolean;
    isPublished: boolean;
  
    startDate: string | null;
    endDate: string | null;
  
    client: string;
    teamSize: number;
  
    createdAt: string;
    updatedAt: string | null;
  
    galleryImages: string[];
    technologies: string[];
  }

  export interface ProjectsResponse<T> {
    success: boolean;
  
    data: T;
  
    pagination: {
      page: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
    };
  
    filters: {
      search?: string;
      category?: string;
      technology?: string;
      sortBy?: "latest" | "oldest";
    };
  };