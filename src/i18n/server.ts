import { cookies } from "next/headers";
import {
  getMessages,
  LANGUAGE_COOKIE_NAME,
  resolveLanguage,
  type Language,
  type Messages,
} from "@/i18n/translations";

export async function getServerLanguage(): Promise<Language> {
  const cookieStore = await cookies();
  return resolveLanguage(cookieStore.get(LANGUAGE_COOKIE_NAME)?.value);
}

export async function getServerLanguageContext(): Promise<{
  language: Language;
  messages: Messages;
}> {
  const language = await getServerLanguage();

  return {
    language,
    messages: getMessages(language),
  };
}
