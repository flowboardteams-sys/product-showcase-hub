import { useCallback, useState } from "react";

export function useVotes() {
  const [voted, setVoted] = useState<Record<string, boolean>>({});

  const toggle = useCallback((id: string) => {
    setVoted((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const countFor = useCallback(
    (id: string, base: number) => base + (voted[id] ? 1 : 0),
    [voted],
  );

  return { voted, toggle, countFor };
}
