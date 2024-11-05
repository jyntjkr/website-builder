export interface WebsiteData {
    name: string;
    title: string;
    profileImage: string;
    twitterUrl: string;
    email: string;
    project1Title: string;
    project1Image: string;
    project2Title: string;
    project2Image: string;
    videoUrl: string;
    username: string; // Added for subdomain
  }
  
  export interface PreviewResponse {
    success: boolean;
    previewUrl?: string;
    error?: string;
  }
  
  export interface DeployResponse {
    success: boolean;
    deployedUrl?: string;
    error?: string;
  }