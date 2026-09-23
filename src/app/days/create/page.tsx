"use client";

import PageTitle from "@/app/components/PageTitle";
import { useActionState } from "react";
import { createDay } from "./actions";
import { initialState } from "./state";

export default function CreateDayPage() {
  const [state, formAction] = useActionState(createDay, initialState);

  return (
    <div>
      <PageTitle>Crear día</PageTitle>

      <form action={formAction} className="space-y-6 max-w-md">
        <div>
          <label className="block mb-1 font-medium">Nombre del día</label>
          <input
            name="name"
            type="text"
            className="w-full p-2 rounded bg-neutral-800 border border-neutral-700"
          />
          {state.errors?.name && (
            <p className="text-red-400 text-sm mt-1">{state.errors.name}</p>
          )}
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded font-medium"
        >
          Crear día
        </button>

        {state.errors?.general && (
          <p className="text-red-400 text-sm mt-2">{state.errors.general}</p>
        )}
      </form>
    </div>
  );
}
