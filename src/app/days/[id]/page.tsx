import PageTitle from "@/app/components/PageTitle";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export const revalidate = 0;

type ExerciseRow = {
  id: number;
  name: string;
  duration: number;
  description: string | null;
};

type DayExerciseRow = {
  exercise_id: number;
  exercise: ExerciseRow;
};

async function getDayWithExercises(id: string) {
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) return null;

  // Obtener el día
  const { data: day } = await supabase
    .from("day")
    .select("*")
    .eq("id", numericId)
    .single();

  if (!day) return null;

  // Obtener los ejercicios asignados
  const { data: exercises } = await supabase
    .from("day_exercise")
    .select("exercise_id, exercise(*)")
    .eq("day_id", numericId);

  return {
    day,
    exercises: (exercises ?? []) as unknown as DayExerciseRow[],
  };
}

export default async function DayPage({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  const resolved = await params;
  const result = await getDayWithExercises(resolved.id);

  if (!result) {
    return (
      <div>
        <PageTitle>Día no encontrado</PageTitle>
        <p className="text-neutral-400 mt-4">
          No existe un día con ID <strong>{resolved.id}</strong>.
        </p>
      </div>
    );
  }

  const { day, exercises } = result;

  return (
    <div>
      <PageTitle>{day.name}</PageTitle>

      <Link
        href={`/days/${day.id}/add`}
        className="inline-block mb-6 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded font-medium"
      >
        Añadir ejercicio
      </Link>

      <div className="space-y-3">
        {exercises.length === 0 && (
          <p className="text-neutral-400">Este día no tiene ejercicios.</p>
        )}

        {exercises.map((item) => (
          <div
            key={item.exercise_id}
            className="p-3 bg-neutral-800 rounded"
          >
            {item.exercise.name} — {item.exercise.duration} min
          </div>
        ))}
      </div>
    </div>
  );
}