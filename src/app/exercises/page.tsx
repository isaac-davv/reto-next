import PageTitle from "@/app/components/PageTitle";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export const revalidate = 0; // evitar cache

async function getExercises() {
  const { data, error } = await supabase
    .from("exercise")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Supabase error:", JSON.stringify(error, null, 2));
    throw error;
  }
  return data;
}

export default async function ExercisesPage() {
  const exercises = await getExercises();

  return (
    <div>
      <PageTitle>Exercises</PageTitle>

      <Link
        href="/exercises/create"
        className="inline-block mb-6 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded font-medium"
      >
        Crear ejercicio
      </Link>

      <ul className="space-y-3">
        {exercises.map((ex) => (
          <li key={ex.id}>
            <Link
              href={`/exercises/${ex.id}`}
              className="block p-3 bg-neutral-800 rounded hover:bg-neutral-700 transition"
            >
              <span className="font-semibold">{ex.name}</span>
              <span className="text-neutral-400 ml-2">
                ({ex.duration} min)
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
