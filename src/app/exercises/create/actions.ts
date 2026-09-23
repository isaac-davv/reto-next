"use server";

import { supabase } from "@/lib/supabaseClient";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { FormState } from "./formState";

const schema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  duration: z.coerce.number().min(1, "Duración mínima: 1 minuto"),
  description: z.string().optional(),
});

export async function createExercise(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    duration: formData.get("duration"),
    description: formData.get("description"),
  });

  if (!parsed.success) {
    return {
      status: 400,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { name, duration, description } = parsed.data;

  const { error } = await supabase
    .from("exercise")
    .insert([{ name, duration, description }]);

  if (error) {
    return {
      status: 500,
      errors: { general: ["Error al insertar en la base de datos"] },
    };
  }

  revalidatePath("/exercises");
  redirect("/exercises");

  return prevState;
}
