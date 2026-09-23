"use server";

import { supabase } from "@/lib/supabaseClient";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export type AssignState = {
  errors?: {
    general?: string[];
  };
};

export async function assignExercise(
  prevState: AssignState,
  formData: FormData
): Promise<AssignState> {
  const dayId = Number(formData.get("dayId"));
  const exerciseId = Number(formData.get("exerciseId"));

  if (!Number.isFinite(dayId) || !Number.isFinite(exerciseId)) {
    return { errors: { general: ["Datos inválidos"] } };
  }

  const { error } = await supabase
    .from("day_exercise")
    .insert([{ day_id: dayId, exercise_id: exerciseId }]);

  if (error) {
    return { errors: { general: ["Error al asignar ejercicio"] } };
  }

  revalidatePath(`/days/${dayId}`);
  redirect(`/days/${dayId}`);

  return prevState;
}