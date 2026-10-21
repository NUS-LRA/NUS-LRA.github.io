import { Member, Research } from './types.ts';

export const LAB_INFO = {
  name: "Learning and Reasoning Agent Group",
  abbreviation: "LRA",
  department: "School of Computing",
  institution: "National University of Singapore",
  location: "School of Computing, National University of Singapore, 13 Computing Drive, Singapore 117417, Republic of Singapore",
  office: "COM3 02-28",
  email: "leews@comp.nus.edu.sg",
  phone: "+65 6516 4526",
  fax: "+65 6779 4580",
  pi: "Prof. Lee Wee Sun",
  tagline: "We build agents that learn from experience and reason to make robust decisions.",
  aboutText: "The Learning and Reasoning Agent Group (LRA) is part of the School of Computing at the National University of Singapore. Our research investigates how agents can learn from data and reason about the world in order to act effectively. We develop the foundations and algorithms that enable intelligent systems to learn, reason, and make robust decisions in complex environments."
};

export const RESEARCH: Research[] = [
  {
    id: "vet-bench",
    title: "Can Vision-Language Models Solve the Shell Game?",
    abstract: "The Visual Entity Tracking Benchmark (VET-Bench) is a synthetic diagnostic benchmark that simulates the classic shell game using visually indistinguishable objects, isolating an agent's ability to track object identity through occlusion and motion. State-of-the-art vision-language models perform at close to random chance on this task, revealing a fundamental gap in visual reasoning. Our proposed Molmo2-SGCoT, which couples structured grounding with chain-of-thought reasoning, achieves over 90% accuracy.",
    media: "research/cup_001.mp4",
    mediaType: "video",
    tags: ["Vision-Language Models", "Visual Reasoning", "Benchmark"],
    venue: "Preprint",
    link: "https://vetbench.github.io/",
    featured: true
  },
  {
    id: "paper-1",
    title: "Paper 1",
    abstract: "This is a placeholder for a research highlight. Replace the title, abstract, media, tags, and link with details of your paper. See public/research/README.md for how to add your own figure or video.",
    media: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&q=80&w=1000",
    mediaType: "image",
    tags: ["Placeholder"],
    venue: "Preprint",
    link: "#"
  },
  {
    id: "paper-2",
    title: "Paper 2",
    abstract: "This is a placeholder for a research highlight. Replace the title, abstract, media, tags, and link with details of your paper. See public/research/README.md for how to add your own figure or video.",
    media: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000",
    mediaType: "image",
    tags: ["Placeholder"],
    venue: "Preprint",
    link: "#"
  },
];

export const MEMBERS: Member[] = [
  {
    id: "lee-wee-sun",
    name: "Lee Wee Sun",
    role: "faculty",
    title: "Professor · Principal Investigator",
    email: "leews@comp.nus.edu.sg",
    website: "https://www.comp.nus.edu.sg/~leews/",
    researchInterests: ["Machine Learning", "Planning Under Uncertainty"]
  },
  {
    id: "kang-liwei",
    name: "Kang Liwei",
    role: "phd",
    title: "PhD Student"
  },
  {
    id: "liu-tiedong",
    name: "Liu Tiedong",
    role: "phd",
    title: "PhD Student"
  },
  {
    id: "liu-wei",
    name: "Liu Wei",
    role: "phd",
    title: "PhD Student"
  },
  {
    id: "ma-jianfei",
    name: "Ma Jianfei",
    role: "phd",
    title: "PhD Student"
  },
  {
    id: "meng-ziqiao",
    name: "Meng Ziqiao",
    role: "phd",
    title: "PhD Student"
  },
  {
    id: "nguyen-hien-tuan-duy",
    name: "Nguyen Hien Tuan Duy",
    role: "phd",
    title: "PhD Student"
  },
  {
    id: "qi-penghui",
    name: "Qi Penghui",
    role: "phd",
    title: "PhD Student"
  },
  {
    id: "tan-chee-heng",
    name: "Tan Chee Heng",
    role: "phd",
    title: "PhD Student"
  },
  {
    id: "fu-guoji",
    name: "Fu Guoji",
    role: "ra",
    title: "Research Assistant"
  },
  {
    id: "dixant-mittal",
    name: "Dixant Mittal",
    role: "alumni",
    title: "Alumni"
  },
  {
    id: "goh-yong-liang",
    name: "Goh Yong Liang",
    role: "alumni",
    title: "Alumni"
  },
  {
    id: "dong-yanfei",
    name: "Dong Yanfei",
    role: "alumni",
    title: "Alumni"
  },
  {
    id: "zhao-zirui",
    name: "Zhao Zirui",
    role: "alumni",
    title: "Alumni"
  },
  {
    id: "liu-zichen",
    name: "Liu Zichen",
    role: "alumni",
    title: "Alumni"
  },
  {
    id: "mohammed-haroon-dupty",
    name: "Mohammed Haroon Dupty",
    role: "alumni",
    title: "Alumni"
  }
];
