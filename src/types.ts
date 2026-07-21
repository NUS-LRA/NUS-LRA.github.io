export interface Member {
  id: string;
  name: string;
  role: 'faculty' | 'phd' | 'ra' | 'alumni';
  title: string;
  avatar?: string;
  bio?: string;
  email?: string;
  website?: string;
  googleScholar?: string;
  github?: string;
  researchInterests?: string[];
  now?: string;
}

export interface Research {
  id: string;
  title: string;
  abstract: string;
  media: string;
  mediaType?: 'image' | 'video' | 'gif';
  poster?: string;
  tags: string[];
  authors?: string[];
  venue?: string;
  link?: string;
  featured?: boolean;
}

export interface ContactInquiry {
  name: string;
  email: string;
  affiliation: string;
  subject: string;
  message: string;
}
