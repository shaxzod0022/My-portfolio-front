import {
  CreateLink,
  GetAllLangLink,
  SocialLink,
} from "@/interfaces/link.interface";
import axios from "axios";

export const LinkService = {
  async getAllLang(id: string) {
    const { data } = await axios.get<GetAllLangLink>(
      `http://localhost:8000/api/links/${id}`
    );
    return data;
  },
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
  async updateLink(form: CreateLink, token: string, id: string, lang: string) {
    const { data } = await axios.put(
      `http://localhost:8000/api/links/${id}?lang=${lang}`,
      form,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  },
};
