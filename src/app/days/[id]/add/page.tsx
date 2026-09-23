import PageTitle from "@/app/components/PageTitle";
import { supabase } from "@/lib/supabaseClient";
import AddExerciseForm from "./form"

export const revalidate = 0;

async function getExercises() {
  const { data } = await supabase
    .from("exercise")
    .select("*")
    .order("name", { ascending: true });

  return data ?? [];
}

export default async function AddExercisePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolved = await params;
  const exercises = await getExercises();

  return (
    <div>
      <PageTitle>Añadir ejercicio</PageTitle>
      <AddExerciseForm dayId={resolved.id} exercises={exercises} />
    </div>
  );
}