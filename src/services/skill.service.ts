import {
  CreateSkills,
  GetAllLangSkills,
  Skills,
} from "@/interfaces/skill.interface";
import axios from "axios";

export const SkillService = {
  async getAllLang(id: string) {
    const { data } = await axios.get<GetAllLangSkills>(
      `http://localhost:8000/api/skills/${id}`
    );
    return data;
  },
  async getAllSkills(lang: string) {
    const { data } = await axios.get<Skills[]>(
      `http://localhost:8000/api/skills?lang=${lang}`
    );
    return data;
  },
  async deleteSkill(id: string, token: string) {
    const { data } = await axios.delete<number>(
      `http://localhost:8000/api/skills/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  },
  async createSkill(form: CreateSkills, token: string) {
    const { data } = await axios.post<Skills>(
      `http://localhost:8000/api/skills`,
      form,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  },
  async updateSkill(
    form: CreateSkills,
    token: string,
    id: string,
    lang: string
  ) {
    const { data } = await axios.put(
      `http://localhost:8000/api/skills/${id}?lang=${lang}`,
      form,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  },
};
