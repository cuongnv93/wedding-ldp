import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import en from "../../messages/en.json";
import vi from "../../messages/vi.json";
import { getCookie } from "cookies-next";

// Helper function to check if locale exists
function hasLocale(
  locales: readonly string[],
  locale: string | undefined
): locale is string {
  return locale != null && locales.includes(locale);
}

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cookieLocale: any = getCookie("NEXT_LOCALE");
  const locale = hasLocale(routing.locales, cookieLocale)
    ? cookieLocale
    : hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: locale === "vi" ? vi : en,
    localeDetection: true,
  };
});
