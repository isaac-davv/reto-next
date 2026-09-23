"use client";

import { useActionState } from "react";
import { assignExercise, type AssignState } from "./actions"

type Exercise = {
  id: number;
  name: string;
  duration: number;
  description?: string | null;
};

type AddExerciseFormProps = {
  dayId: number | string;
  exercises: Exercise[];
};

const initialState: AssignState = { errors: {} };

export default function AddExerciseForm({ dayId, exercises }: AddExerciseFormProps) {
  const [state, formAction] = useActionState(assignExercise, initialState);

  return (
    <form action={formAction} className="space-y-6 max-w-md">
      <input type="hidden" name="dayId" value={dayId} />

      <div>
        <label className="block mb-1 font-medium">Ejercicio</label>
        <select
          name="exerciseId"
          className="w-full p-2 rounded bg-neutral-800 border border-neutral-700"
        >
          {exercises.map((ex) => (
            <option key={ex.id} value={ex.id}>
              {ex.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded font-medium"
      >
        Añadir
      </button>

      {state.errors?.general && (
        <p className="text-red-400 text-sm mt-2">{state.errors.general}</p>
      )}
    </form>
  );
}