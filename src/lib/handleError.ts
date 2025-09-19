import { AxiosError } from "axios";
import axios from "axios";

interface BackendError {
  statusCode: number;
  message: string | string[];
  error: string;
}

export function handleError(err: unknown): string {
  if (axios.isAxiosError<BackendError>(err)) {
    if (err.response) {
      const data = err.response.data;
      const message = Array.isArray(data.message)
        ? data.message.join(", ")
        : data.message;

      return message || "Serverdan noma’lum xato qaytdi";
    }
    return "Serverga ulanib bo‘lmadi";
  }

  if (err instanceof Error) {
    return err.message;
  }

  return "Noma’lum xato yuz berdi";
}
