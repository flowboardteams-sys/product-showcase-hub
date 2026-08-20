import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { getPost, posts } from "@/data/posts";
import { SiteHeader } from "@/components/SiteHeader";
import { VoteButton } from "@/components/VoteButton";
import { useVotes } from "@/hooks/useVotes";

export const Route = createFileRoute("/posts/$postId")({
  loader: ({ params }) => {
    const post = getPost(params.postId);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product not found" }, { name: "robots", content: "noindex" }],
      };
    }
    const { post } = loaderData;
    const title = `${post.name} — ${post.tagline}`;
    return {
      meta: [
        { title },
        { name: "description", content: post.description },
        { property: "og:title", content: title },
        { property: "og:description", content: post.description },
      ],
    };
  },
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const { voted, toggle, countFor } = useVotes();
  const related = posts.filter((p) => p.id !== post.id).slice(0, 4);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Back to launches
        </Link>

        <div className="mt-8 flex items-start gap-5">
          <span className="grid size-20 shrink-0 place-items-center rounded-2xl border border-border bg-card text-4xl">
            {post.emoji}
          </span>
          <div className="flex-1">
            <h1 className="font-display text-3xl font-bold tracking-tight">{post.name}</h1>
            <p className="mt-1 text-lg text-muted-foreground">{post.tagline}</p>
          </div>
          <VoteButton
            size="lg"
            count={countFor(post.id, post.votes)}
            voted={!!voted[post.id]}
            onToggle={() => toggle(post.id)}
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {post.topics.map((t) => (
            <span
              key={t}
              className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        <article className="mt-8 rounded-2xl border border-border bg-card p-6">
          <p className="leading-relaxed text-foreground/90">{post.description}</p>
          <div className="mt-6 flex items-center gap-4 border-t border-border pt-4 text-sm text-muted-foreground">
            <span>
              Launched by <span className="text-foreground">{post.maker}</span>
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="size-4" />
              {post.comments} comments
            </span>
          </div>
        </article>

        <section className="mt-12">
          <h2 className="font-display text-lg font-semibold">More launches</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {related.map((p) => (
              <Link
                key={p.id}
                to="/posts/$postId"
                params={{ postId: p.id }}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary"
              >
                <span className="text-2xl">{p.emoji}</span>
                <div className="min-w-0">
                  <p className="font-display text-sm font-semibold">{p.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{p.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
