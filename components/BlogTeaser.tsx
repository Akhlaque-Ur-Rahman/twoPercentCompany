import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import type { BlogPost } from "@/data/BlogData";

type BlogTeaserProps = {
  posts: BlogPost[];
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogTeaser({ posts }: BlogTeaserProps) {
  if (!posts.length) return null;

  return (
    <section className="page-px section-y border-t border-header-stroke">
      <div className="space-y-2 mb-8">
        <p className="type-label text-primary">From the blog</p>
        <SectionHeader
          title="Read from our blog"
          description="Local guides for Patna buyers and investors."
          action={{ label: "View all posts", href: "/blog" }}
          actionVariant="secondary"
          actionAlwaysVisible
        />
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {posts.slice(0, 4).map((post) => (
          <li key={post.id}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex flex-col h-full border border-header-stroke rounded-card overflow-hidden bg-2nd-bg hover:border-primary/40 transition-colors"
            >
              <div className="relative aspect-[16/10] bg-black">
                <Image
                  src={post.cover}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  aria-hidden
                />
              </div>
              <div className="p-4 flex flex-col gap-1.5 flex-1">
                <p className="type-caption text-secondary-text">
                  {formatDate(post.publishedAt)}
                </p>
                <h3 className="type-body font-semibold text-body group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
