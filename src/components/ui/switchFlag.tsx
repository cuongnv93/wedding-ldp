"use client";
import { usePathname, useParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";

export function SwitchFlag() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params?.locale as string;
  const [checked, setChecked] = useState(currentLocale === "en");

  const handleChange = () => {
    const newLocale = checked ? "vi" : "en";
    // Thay locale ở đầu pathname
    const newPath = pathname.replace(/^\/(vi|en)/, `/${newLocale}`);
    router.push(newPath);
    setChecked(!checked);
  };

  return (
    <div className="flag-switch" data-first-lang="EN" data-second-lang="VI">
      <input
        type="checkbox"
        id="check1"
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor="check1"></label>
    </div>
  );
}
