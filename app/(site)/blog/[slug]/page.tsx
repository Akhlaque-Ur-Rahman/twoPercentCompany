import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPosts } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Blog | 2% Company" };
  return {
    title: `${post.title} | 2% Company`,
    description: post.excerpt,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return notFound();

  const paragraphs = post.body.split(/\n\n+/).filter(Boolean);

  return (
    <div className="bg-main-bg text-body border-b border-header-stroke">
      <article className="page-px section-y max-w-3xl mx-auto">
        <nav className="mb-6 type-caption text-secondary-text">
          <Link href="/blog" className="hover:text-body">
            Blog
          </Link>
          <span aria-hidden> / </span>
          <span className="text-body line-clamp-1">{post.title}</span>
        </nav>

        <header className="space-y-4 mb-8">
          <p className="type-caption text-secondary-text">
            {formatDate(post.publishedAt)} · {post.authorName} ·{" "}
            {post.category}
          </p>
          <h1 className="type-display text-body text-balance">{post.title}</h1>
          <p className="type-body text-secondary-text">{post.excerpt}</p>
        </header>

        <div className="relative aspect-[16/9] rounded-media overflow-hidden border border-header-stroke mb-10 bg-black">
          <Image
            src={post.cover}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
            aria-hidden
          />
        </div>

        <div className="space-y-4 type-body text-secondary-text leading-relaxed">
          {paragraphs.map((block, i) => {
            if (block.startsWith("**") && block.endsWith("**")) {
              return (
                <h2 key={i} className="type-subhead text-body pt-2">
                  {block.replace(/\*\*/g, "")}
                </h2>
              );
            }
            if (block.match(/^\d+\./m) || block.startsWith("- ")) {
              const lines = block.split("\n").filter(Boolean);
              return (
                <ul key={i} className="list-disc pl-5 space-y-1">
                  {lines.map((line, j) => (
                    <li key={j}>{line.replace(/^[-*\d.]+\s*/, "")}</li>
                  ))}
                </ul>
              );
            }
            return <p key={i}>{block.replace(/\*\*/g, "")}</p>;
          })}
        </div>

        <div className="mt-12 pt-8 border-t border-header-stroke">
          <Link
            href="/contact"
            className="inline-flex px-6 py-3 rounded-control bg-primary text-on-primary font-semibold type-body hover:brightness-110"
          >
            Talk to 2% Company
          </Link>
        </div>
      </article>
    </div>
  );
}
