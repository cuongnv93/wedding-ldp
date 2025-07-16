import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import en from "../../messages/en.json";
import vi from "../../messages/vi.json";

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

  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: locale === "vi" ? vi : en,
    localeDetection: true,
  };
});
