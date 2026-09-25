"use client";

import { useActionState } from "react";

import { login, type LoginState } from "./actions";

const initialState: LoginState = { error: null };

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <form
      action={formAction}
      className="flex w-full max-w-sm flex-col gap-4 rounded-shell-top border border-border-shell p-6"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="font-jura text-base">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoFocus
          required
          className="rounded-shell-bottom border border-border-shell bg-transparent px-3 py-2 font-albert-sans text-text-primary outline-none focus:border-accent-orange"
        />
      </div>

      {state.error && (
        <p className="font-albert-sans text-sm text-accent-orange">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-pill border border-border-shell px-4 py-2 font-jura text-base transition-colors duration-300 ease-in-out hover:border-accent-orange hover:text-accent-orange disabled:opacity-60"
      >
        {isPending ? "Checking..." : "Enter"}
      </button>
    </form>
  );
}
