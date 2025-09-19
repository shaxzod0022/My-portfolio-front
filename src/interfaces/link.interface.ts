export interface SocialLink {
  _id: string;
  linkName: string;
  linkPathname: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLink {
  translations: {
    uz: { linkName: string };
    ru: { linkName: string };
    en: { linkName: string };
  };
  linkPathname: string;
}
