import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog | 2% Company",
  description:
    "Patna real estate guides — buying tips, localities, and investment notes from 2% Company.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="bg-main-bg text-body border-b border-header-stroke">
      <section className="page-px section-y space-y-10">
        <div className="max-w-2xl space-y-3">
          <p className="type-label text-primary font-semibold tracking-[0.14em]">
            Blog
          </p>
          <h1 className="type-display text-body">Patna real estate notes</h1>
          <p className="type-body text-secondary-text">
            Practical guides for buyers, renters, and investors — written for
            local decisions.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <li key={post.id}>
              <article className="h-full flex flex-col border border-header-stroke rounded-card overflow-hidden bg-2nd-bg">
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative block aspect-[16/10] bg-black"
                >
                  <Image
                    src={post.cover}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    aria-hidden
                  />
                </Link>
                <div className="flex flex-col flex-1 gap-2 p-5">
                  <p className="type-caption text-secondary-text">
                    {formatDate(post.publishedAt)} · {post.category}
                  </p>
                  <h2 className="type-card-title text-body">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="type-caption text-secondary-text line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-auto type-caption font-semibold text-primary pt-2"
                  >
                    Read more
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
