import type { Metadata } from "next";

import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "The Search",
  robots: { index: false, follow: false },
};

export default function TheSearchLoginPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6">
      <h1 className="font-jura text-3xl">The Search</h1>
      <LoginForm />
    </div>
  );
}
