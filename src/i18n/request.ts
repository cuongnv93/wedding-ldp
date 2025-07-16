import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import en from "../../messages/en.json";
import vi from "../../messages/vi.json";
import { cookies } from "next/headers";

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
  // Get locale from cookie as fallback
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let locale: any = routing.defaultLocale;

  if (hasLocale(routing.locales, requested)) {
    locale = requested;
    console.log("Using URL locale:", locale);
  } else if (hasLocale(routing.locales, cookieLocale)) {
    locale = cookieLocale;
    console.log("Using cookie locale:", locale);
  } else {
    console.log("Using default locale:", locale);
  }

  return {
    locale,
    messages: locale === "vi" ? vi : en,
    localeDetection: true,
  };
});
