"use server";

import { supabase } from "@/lib/supabaseClient";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export type FormState = {
  errors?: {
    name?: string[];
    general?: string[];
  };
};

const schema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
});

export async function createDay(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
  });

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { name } = parsed.data;

  const { error } = await supabase.from("day").insert([{ name }]);

  if (error) {
    return {
      errors: { general: ["Error al insertar en la base de datos"] },
    };
  }

  revalidatePath("/days");
  redirect("/days");

  return prevState;
}
