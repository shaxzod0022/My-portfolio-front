export interface AboutResponse {
  _id: string;
  authorName: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface AboutCreate {
  trAuthorName: {
    uz: { authorName: string };
    ru: { authorName: string };
    en: { authorName: string };
  };
  trTitle: {
    uz: { title: string };
    ru: { title: string };
    en: { title: string };
  };
  trDes: {
    uz: { description: string };
    ru: { description: string };
    en: { description: string };
  };
  image: string;
}
