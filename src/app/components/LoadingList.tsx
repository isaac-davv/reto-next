export default function LoadingList() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-6 bg-neutral-700 animate-pulse rounded"
        />
      ))}
    </div>
  );
}
