import { CreateLink, SocialLink } from "@/interfaces/link.interface";
import axios from "axios";

export const LinkService = {
  async getAllLinks(lang: string) {
    const { data } = await axios.get<SocialLink[]>(
      `http://localhost:8000/api/links?lang=${lang}`
    );
    return data;
  },
  async deleteLink(id: string, token: string) {
    const { data } = await axios.delete<number>(
      `http://localhost:8000/api/links/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  },
  async createLink(form: CreateLink, token: string) {
    const { data } = await axios.post<SocialLink>(
      `http://localhost:8000/api/links`,
      form,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  },
};
