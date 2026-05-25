import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { CreatureCard } from "@/components/CreatureCard";
import { categories, getByCategory, type Category } from "@/data/creatures";

export const Route = createFileRoute("/categories/$slug")({
  loader: ({ params }) => {
    const cat = categories.find(c => c.id.toLowerCase().replace(/\s+/g, "-") === params.slug.toLowerCase());
    if (!cat) throw notFound();
    return { cat, list: getByCategory(cat.id as Category) };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.cat.id} — Ancient Bestiary` },
      { name: "description", content: loaderData.cat.desc },
    ] : [],
  }),
  component: CategoryPage,
  notFoundComponent: () => (
    <SiteShell>
      <div className="max-w-2xl mx-auto px-6 py-32 text-center">
        <h1 className="font-display text-4xl gold-gradient">Unknown order</h1>
        <Link to="/bestiary" className="inline-block mt-6 font-rune text-xs text-gold hover:underline">Return to the Archive →</Link>
      </div>
    </SiteShell>
  ),
});

function CategoryPage() {
  const { cat, list } = Route.useLoaderData();
  return (
    <SiteShell>
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-10 text-center">
        <div className="text-6xl mb-4">{cat.icon}</div>
        <div className="font-rune text-xs text-gold/70">Creature Order</div>
        <h1 className="font-display text-5xl gold-gradient mt-2">{cat.id}</h1>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">{cat.desc}</p>
      </section>
      <section className="max-w-7xl mx-auto px-6 pb-20">
        {list.length === 0 ? (
          <div className="glass-card p-12 text-center text-muted-foreground">No recorded specimens in this order yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {list.map((c: any) => <CreatureCard key={c.id} creature={c} />)}
          </div>
        )}
      </section>
    </SiteShell>
  );
}
