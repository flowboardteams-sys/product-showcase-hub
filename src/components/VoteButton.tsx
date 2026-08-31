import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function VoteButton({
  count,
  voted,
  onToggle,
  size = "md",
}: {
  count: number;
  voted: boolean;
  onToggle: () => void;
  size?: "md" | "lg";
}) {
  return (
    <Button
      type="button"
      variant={voted ? "default" : "outline"}
      size="default"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      aria-pressed={voted}
      aria-label={voted ? "Remove upvote" : "Upvote"}
      className={cn(
        "flex h-auto shrink-0 flex-col items-center justify-center rounded-xl font-semibold transition-all",
        size === "md" ? "w-14 py-2" : "w-20 py-3",
        voted
          ? "shadow-[0_6px_20px_-8px_var(--primary)]"
          : "bg-card text-foreground hover:border-primary hover:text-primary",
      )}
    >
      <ChevronUp className={cn(size === "md" ? "size-4" : "size-5")} strokeWidth={3} />
      <span className={cn("tabular-nums", size === "md" ? "text-sm" : "text-lg")}>
        {count}
      </span>
    </Button>
  );
}
