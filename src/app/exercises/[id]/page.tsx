import PageTitle from "@/app/components/PageTitle";
import { supabase } from "@/lib/supabaseClient";

export const revalidate = 0;

async function getExercise(id: string) {
  const numericId = Number(id);

  if (!Number.isFinite(numericId)) {
    return null;
  }

  const { data } = await supabase
    .from("exercise")
    .select("*")
    .eq("id", numericId)
    .single();

  return data ?? null;
}

export default async function ExercisePage({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  const resolved = await params;
  const exercise = await getExercise(resolved.id);

  if (!exercise) {
    return (
      <div>
        <PageTitle>Ejercicio no encontrado</PageTitle>
        <p className="text-neutral-400 mt-4">
          No existe un ejercicio con ID <strong>{resolved.id}</strong>.
        </p>
      </div>
    );
  }

  return (
    <div>
      <PageTitle>{exercise.name}</PageTitle>

      <p className="text-neutral-300 mb-4">
        Duración: <strong>{exercise.duration} min</strong>
      </p>

      {exercise.description && (
        <p className="text-neutral-400">{exercise.description}</p>
      )}
    </div>
  );
}
