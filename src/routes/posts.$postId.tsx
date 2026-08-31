import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Grid2X2,
  MessageSquare,
  Plus,
  Share2,
  Sparkle,
  Star,
  Users,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { getPost, posts, type Post } from "@/data/posts";
import { SiteHeader } from "@/components/SiteHeader";
import { VoteButton } from "@/components/VoteButton";
import { Button } from "@/components/ui/button";
import { useVotes } from "@/hooks/useVotes";

export const Route = createFileRoute("/posts/$postId")({
  loader: ({ params }) => {
    const post = getPost(params.postId);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Product not found" }, { name: "robots", content: "noindex" }] };
    const { post } = loaderData;
    const title = `${post.name} — ${post.tagline}`;
    return { meta: [
      { title },
      { name: "description", content: post.description },
      { property: "og:title", content: title },
      { property: "og:description", content: post.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ] };
  },
  component: PostPage,
});

const tabs = ["Overview", "Reviews", "AI Insights", "Demo Video", "Alternatives", "Forum", "Team", "Awards", "Analytics"];

function PostPage() {
  const { post } = Route.useLoaderData();
  const { voted, toggle, countFor } = useVotes();
  const [activeTab, setActiveTab] = useState("Overview");
  const [following, setFollowing] = useState(false);
  const [saved, setSaved] = useState(false);
  const related = posts.filter((item) => item.id !== post.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-[1440px] px-5 pb-24 pt-8 sm:px-8 lg:px-12">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"><ArrowLeft className="size-4" /> Back to launches</Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_330px] lg:gap-16">
          <div className="min-w-0">
            <ProductHeader post={post} count={countFor(post.id, post.votes)} voted={!!voted[post.id]} onToggle={() => toggle(post.id)} />
            <div className="mt-8 flex min-w-0 gap-2 overflow-x-auto border-b border-border pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {tabs.map((tab) => <Button key={tab} type="button" variant={activeTab === tab ? "secondary" : "ghost"} size="sm" onClick={() => setActiveTab(tab)} className="shrink-0 rounded-full px-4">{tab}</Button>)}
            </div>
            {activeTab === "Overview" ? <Overview post={post} following={following} saved={saved} onFollow={() => setFollowing((value) => !value)} onSave={() => setSaved((value) => !value)} /> : <TabPlaceholder tab={activeTab} postName={post.name} />}
          </div>
          <aside className="min-w-0 lg:border-l lg:border-border lg:pl-8"><Sidebar post={post} following={following} saved={saved} onFollow={() => setFollowing((value) => !value)} onSave={() => setSaved((value) => !value)} /></aside>
        </div>

        <section className="mt-16 border-t border-border pt-10 lg:mr-[378px]">
          <div className="flex items-center justify-between gap-4"><h2 className="font-display text-xl font-semibold">More launches</h2><Link to="/" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">View all <ArrowRight className="size-4" /></Link></div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">{related.map((item) => <Link key={item.id} to="/posts/$postId" params={{ postId: item.id }} className="group flex min-w-0 items-center gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary"><span className="grid size-11 shrink-0 place-items-center rounded-lg border border-border bg-background text-xl">{item.emoji}</span><div className="min-w-0"><p className="font-display text-sm font-semibold group-hover:text-primary">{item.name}</p><p className="truncate text-xs text-muted-foreground">{item.tagline}</p></div><ChevronRight className="ml-auto size-4 shrink-0 text-muted-foreground" /></Link>)}</div>
        </section>
      </main>
    </div>
  );
}

function ProductHeader({ post, count, voted, onToggle }: { post: Post; count: number; voted: boolean; onToggle: () => void }) {
  return <header className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-start"><div className="flex min-w-0 items-start gap-5"><span className="grid size-20 shrink-0 place-items-center rounded-2xl border border-border bg-card text-4xl shadow-sm sm:size-24 sm:text-5xl">{post.emoji}</span><div className="min-w-0 pt-1"><div className="flex flex-wrap items-center gap-3"><h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{post.name}</h1><span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">Launched {post.day === "today" ? "Today" : "Yesterday"}</span></div><p className="mt-2 text-lg text-muted-foreground sm:text-xl">{post.tagline}</p><div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground"><span className="inline-flex items-center gap-1 text-accent-foreground"><Star className="size-4 fill-current text-primary" /> 4.8</span><span aria-hidden="true">•</span><span>{post.comments} reviews</span><span aria-hidden="true">•</span><span>by {post.maker}</span></div><div className="mt-4 flex flex-wrap gap-2">{post.topics.map((topic) => <span key={topic} className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground"><Grid2X2 className="size-3" /> {topic}</span>)}</div></div></div><VoteButton size="lg" count={count} voted={voted} onToggle={onToggle} /></header>;
}

function Overview({ post, following, saved, onFollow, onSave }: { post: Post; following: boolean; saved: boolean; onFollow: () => void; onSave: () => void }) {
  return <div className="mt-9"><section><p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Pitch / Description</p><p className="mt-5 max-w-5xl text-lg leading-8 text-foreground/90 sm:text-xl">{post.description}</p></section><ProductPreview post={post} /><section className="mt-10 flex flex-wrap items-center justify-between gap-5 border-y border-border py-6"><div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-full bg-secondary font-display font-bold text-secondary-foreground">{post.maker.split(" ").map((part) => part[0]).join("")}</span><div><p className="text-sm font-semibold">{post.maker}</p><p className="text-xs text-muted-foreground">Launching useful things</p></div></div><Button type="button" variant={following ? "secondary" : "outline"} size="sm" onClick={onFollow} className="rounded-full">{following ? <Check /> : <Plus />}{following ? "Following" : "Follow maker"}</Button></section><Discussion post={post} saved={saved} onSave={onSave} /></div>;
}

function ProductPreview({ post }: { post: Post }) {
  return <section className="mt-9 overflow-hidden rounded-xl border border-border bg-card shadow-sm"><div className="flex items-center justify-between border-b border-border px-4 py-3 text-xs text-muted-foreground sm:px-5"><span className="inline-flex items-center gap-2 font-semibold text-foreground"><span className="grid size-5 place-items-center rounded bg-primary text-[10px] text-primary-foreground">{post.emoji}</span>{post.name}</span><span className="inline-flex items-center gap-2"><span className="size-2 rounded-full bg-primary" /> Live preview</span></div><div className="grid min-h-[290px] gap-8 bg-muted/35 p-5 sm:grid-cols-[1.1fr_0.9fr] sm:p-8"><div className="flex flex-col justify-center"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Everything in one place</p><p className="mt-3 max-w-md font-display text-3xl font-semibold leading-tight sm:text-4xl">A clearer way to move work forward.</p><div className="mt-6 flex gap-2"><span className="h-2 w-24 rounded-full bg-primary/70" /><span className="h-2 w-12 rounded-full bg-border" /><span className="h-2 w-8 rounded-full bg-border" /></div></div><div className="rounded-lg border border-border bg-card p-3 shadow-sm"><div className="flex items-center justify-between border-b border-border pb-3"><span className="text-xs font-semibold">Today&apos;s overview</span><ChevronDown className="size-4 text-muted-foreground" /></div><div className="mt-4 grid grid-cols-3 gap-2">{["New", "Active", "Done"].map((label, index) => <div key={label} className="rounded-md bg-muted p-2"><p className="text-[10px] text-muted-foreground">{label}</p><p className="mt-1 font-display text-lg font-semibold">{[12, 8, 24][index]}</p></div>)}</div><div className="mt-4 space-y-2">{["Customer conversations", "Weekly launch report", "Team handoff"].map((label, index) => <div key={label} className="flex items-center gap-2 rounded-md border border-border px-2 py-2 text-xs"><span className={index === 1 ? "size-2 rounded-full bg-primary" : "size-2 rounded-full bg-secondary"} /><span className="truncate">{label}</span><ArrowRight className="ml-auto size-3 text-muted-foreground" /></div>)}</div></div></div></section>;
}

function Discussion({ post, saved, onSave }: { post: Post; saved: boolean; onSave: () => void }) {
  return <section className="mt-12"><div className="flex items-end justify-between gap-4"><div><p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Discussion</p><h2 className="mt-2 font-display text-2xl font-semibold">What do you think?</h2></div><span className="text-sm text-muted-foreground">{post.comments} comments</span></div><div className="mt-5 rounded-xl border border-border bg-card p-4 shadow-sm"><div className="flex gap-3"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-sm font-bold text-secondary-foreground">Y</span><div className="min-w-0 flex-1"><p className="text-sm text-muted-foreground">Leave feedback for the maker...</p><div className="mt-5 flex justify-end gap-2"><Button type="button" variant={saved ? "secondary" : "ghost"} size="sm" onClick={onSave} aria-label="Save product"><Bookmark className={saved ? "fill-current" : ""} /></Button><Button type="button" size="sm" className="rounded-full">Post comment</Button></div></div></div></div></section>;
}

function Sidebar({ post, following, saved, onFollow, onSave }: { post: Post; following: boolean; saved: boolean; onFollow: () => void; onSave: () => void }) {
  const rank = Math.max(1, posts.findIndex((item) => item.id === post.id) + 1);
  return <div className="space-y-10"><div className="flex items-center justify-between gap-3"><span className="text-sm font-semibold text-muted-foreground">Day rank</span><div className="flex gap-1"><Button type="button" variant="outline" size="icon" aria-label="Previous product"><ChevronLeft /></Button><Button type="button" variant="outline" size="icon" aria-label="Next product"><ChevronRight /></Button></div></div><p className="font-display text-5xl font-bold">#{rank}<span className="ml-2 text-sm font-medium text-muted-foreground">today</span></p><div className="grid gap-3"><Button type="button" variant="outline" onClick={onFollow} className="h-12 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"><Users /> {following ? "Following maker" : "Follow maker"}</Button><Button type="button" variant={saved ? "secondary" : "outline"} onClick={onSave} className="h-12 rounded-full"><Bookmark className={saved ? "fill-current" : ""} /> {saved ? "Saved to collection" : "Add to collection"}</Button><Button type="button" variant="ghost" className="h-12 rounded-full"><Share2 /> Share</Button></div><InfoGroup title="Launch details"><InfoRow icon={<Sparkle />} label="Launched in 2026" /><InfoRow icon={<Check />} label={`Built by ${post.maker}`} /><InfoRow icon={<MessageSquare />} label={`${post.comments} community comments`} /></InfoGroup><InfoGroup title="About the maker"><div className="flex items-center gap-3"><span className="grid size-12 place-items-center rounded-full bg-secondary font-display font-bold text-secondary-foreground">{post.maker.split(" ").map((part) => part[0]).join("")}</span><div><p className="font-semibold">{post.maker}</p><p className="text-sm text-muted-foreground">Independent maker</p></div></div><Button type="button" variant="link" onClick={onFollow} className="mt-4 h-auto p-0">View maker profile <ArrowRight /></Button></InfoGroup><InfoGroup title="Similar products"><div className="space-y-4">{posts.filter((item) => item.id !== post.id).slice(0, 3).map((item) => <Link key={item.id} to="/posts/$postId" params={{ postId: item.id }} className="group flex items-center gap-3"><span className="grid size-11 shrink-0 place-items-center rounded-lg border border-border bg-card text-xl">{item.emoji}</span><div className="min-w-0"><p className="truncate font-semibold group-hover:text-primary">{item.name}</p><p className="truncate text-xs text-muted-foreground">{item.tagline}</p></div></Link>)}</div></InfoGroup></div>;
}

function InfoGroup({ title, children }: { title: string; children: ReactNode }) { return <section><h2 className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{title}</h2><div className="mt-4">{children}</div></section>; }
function InfoRow({ icon, label }: { icon: ReactNode; label: string }) { return <div className="flex items-center gap-3 py-2 text-sm text-muted-foreground"><span className="text-primary [&_svg]:size-4">{icon}</span>{label}</div>; }
function TabPlaceholder({ tab, postName }: { tab: string; postName: string }) { return <div className="mt-10 rounded-xl border border-border bg-card px-6 py-16 text-center shadow-sm"><p className="font-display text-2xl font-semibold">{tab}</p><p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">Community updates and insights for {postName} will appear here.</p></div>; }