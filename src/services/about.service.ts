import { AboutCreate, AboutResponse } from "@/interfaces/about.interface";
import axios from "axios";

export class AboutService {
  async create(form: AboutCreate, token: string) {
    const { data } = await axios.post<AboutResponse>(
      "http://localhost/api/about",
      form
    );
    return data;
  }
  async getAll() {
    const { data } = await axios.get<AboutResponse[]>(
      "http://localhost/api/about"
    );
    return data;
  }
  async remove(id: string) {
    const { data } = await axios.get<AboutResponse>(
      `http://localhost/api/about/${id}`
    );
    return data;
  }
}
