import PageTitle from "@/app/components/PageTitle";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export const revalidate = 0;

async function getDays() {
  const { data } = await supabase
    .from("day")
    .select("*")
    .order("id", { ascending: true });

  return data ?? [];
}

export default async function DaysPage() {
  const days = await getDays();

  return (
    <div>
      <PageTitle>Días</PageTitle>

      <Link
        href="/days/create"
        className="inline-block mb-6 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded font-medium"
      >
        Crear día
      </Link>

      <div className="space-y-3">
        {days.map((day) => (
          <Link
            key={day.id}
            href={`/days/${day.id}`}
            className="block p-3 bg-neutral-800 rounded hover:bg-neutral-700"
          >
            {day.name}
          </Link>
        ))}

        {days.length === 0 && (
          <p className="text-neutral-400">No hay días creados.</p>
        )}
      </div>
    </div>
  );
}
