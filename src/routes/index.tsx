import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageSquare } from "lucide-react";
import { posts, type Post } from "@/data/posts";
import { SiteHeader } from "@/components/SiteHeader";
import { VoteButton } from "@/components/VoteButton";
import { useVotes } from "@/hooks/useVotes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Product Hunt — Today's best new products" },
      {
        name: "description",
        content:
          "Discover 20 new products launching today and yesterday, ranked by upvotes from the community.",
      },
      { property: "og:title", content: "Product Hunt — Today's best new products" },
      {
        property: "og:description",
        content: "Discover the newest products, ranked by community upvotes.",
      },
    ],
  }),
  component: Index,
});

function PostRow({
  post,
  rank,
  count,
  voted,
  onToggle,
}: {
  post: Post;
  rank: number;
  count: number;
  voted: boolean;
  onToggle: () => void;
}) {
  return (
    <Link
      to="/posts/$postId"
      params={{ postId: post.id }}
      className="group flex items-center gap-4 rounded-2xl px-3 py-4 transition-colors hover:bg-card"
    >
      <span className="hidden w-6 shrink-0 text-right font-display text-sm text-muted-foreground sm:block">
        {rank}
      </span>
      <span className="grid size-14 shrink-0 place-items-center rounded-xl border border-border bg-card text-2xl">
        {post.emoji}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <h3 className="font-display text-base font-semibold group-hover:text-primary">
            {post.name}
          </h3>
          <p className="truncate text-sm text-muted-foreground">— {post.tagline}</p>
        </div>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          {post.topics.map((t) => (
            <span key={t} className="rounded-full bg-secondary px-2 py-0.5">
              {t}
            </span>
          ))}
          <span className="flex items-center gap-1">
            <MessageSquare className="size-3.5" />
            {post.comments}
          </span>
        </div>
      </div>
      <VoteButton count={count} voted={voted} onToggle={onToggle} />
    </Link>
  );
}

function Index() {
  const { voted, toggle, countFor } = useVotes();
  const today = posts.filter((p) => p.day === "today");
  const yesterday = posts.filter((p) => p.day === "yesterday");

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-4 pb-24">
        <section className="border-b border-border py-12">
          <p className="font-display text-xs uppercase tracking-[0.2em] text-primary">
            Launch feed
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            The best new products, every single day.
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            20 launches from makers shipping right now. Upvote what you'd actually use.
          </p>
        </section>

        <Section title="Top launches today" caption={`${today.length} products`}>
          {today.map((post, i) => (
            <PostRow
              key={post.id}
              post={post}
              rank={i + 1}
              count={countFor(post.id, post.votes)}
              voted={!!voted[post.id]}
              onToggle={() => toggle(post.id)}
            />
          ))}
        </Section>

        <Section title="Yesterday" caption={`${yesterday.length} products`}>
          {yesterday.map((post, i) => (
            <PostRow
              key={post.id}
              post={post}
              rank={i + 1}
              count={countFor(post.id, post.votes)}
              voted={!!voted[post.id]}
              onToggle={() => toggle(post.id)}
            />
          ))}
        </Section>
      </main>
    </div>
  );
}

function Section({
  title,
  caption,
  children,
}: {
  title: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <section className="pt-10">
      <div className="flex items-baseline justify-between px-3">
        <h2 className="font-display text-lg font-semibold">{title}</h2>
        <span className="text-xs uppercase tracking-wider text-muted-foreground">
          {caption}
        </span>
      </div>
      <div className="mt-3 divide-y divide-border/70">{children}</div>
    </section>
  );
}
