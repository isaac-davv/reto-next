"use client";

import PageTitle from "@/app/components/PageTitle";
import { useActionState } from "react";
import { createExercise } from "./actions";
import type { FormState } from "./formState";

const initialState: FormState = {
  status: 0,
  errors: {},
};

export default function CreateExercisePage() {
  const [state, formAction] = useActionState(createExercise, initialState);

  return (
    <div>
      <PageTitle>Crear ejercicio</PageTitle>

      <form action={formAction} className="space-y-6 max-w-md">

        {/* NAME */}
        <div>
          <label className="block mb-1 font-medium">Nombre</label>
          <input
            name="name"
            type="text"
            className="w-full p-2 rounded bg-neutral-800 border border-neutral-700"
          />
          {state.errors?.name && (
            <p className="text-red-400 text-sm mt-1">{state.errors.name}</p>
          )}
        </div>

        {/* DURATION */}
        <div>
          <label className="block mb-1 font-medium">Duración (min)</label>
          <input
            name="duration"
            type="number"
            className="w-full p-2 rounded bg-neutral-800 border border-neutral-700"
          />
          {state.errors?.duration && (
            <p className="text-red-400 text-sm mt-1">{state.errors.duration}</p>
          )}
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block mb-1 font-medium">Descripción</label>
          <textarea
            name="description"
            className="w-full p-2 rounded bg-neutral-800 border border-neutral-700"
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded font-medium"
        >
          Crear ejercicio
        </button>

        {/* ERROR GENERAL */}
        {state.errors?.general && (
          <p className="text-red-400 text-sm mt-2">{state.errors.general}</p>
        )}
      </form>
    </div>
  );
}
