export function ProductCardSkeleton() {
  return (
    <div>
      <div className="aspect-square rounded-2xl bg-muted shimmer" />
      <div className="mt-4 space-y-2 px-1">
        <div className="h-3 w-1/3 rounded bg-muted shimmer" />
        <div className="h-5 w-3/4 rounded bg-muted shimmer" />
        <div className="h-4 w-1/4 rounded bg-muted shimmer" />
      </div>
    </div>
  );
}
