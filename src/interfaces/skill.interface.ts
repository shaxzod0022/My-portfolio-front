export interface Skills {
  _id: string;
  skillName: string;
  skillIcon: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSkills {
  translations: {
    uz: { skillName: string };
    ru: { skillName: string };
    en: { skillName: string };
  };
  skillIcon: string;
}

export interface GetAllLangSkills {
  _id: string;
  translations: {
    uz: { skillName: string };
    ru: { skillName: string };
    en: { skillName: string };
  };
  skillIcon: string;
  createdAt: string;
  updatedAt: string;
}
