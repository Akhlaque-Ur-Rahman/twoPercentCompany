import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import type { TeamMember } from "@/data/TeamData";

type TeamStripProps = {
  members: TeamMember[];
};

export default function TeamStrip({ members }: TeamStripProps) {
  if (!members.length) return null;

  return (
    <section className="page-px section-y border-t border-header-stroke bg-2nd-bg/30">
      <div className="space-y-2 mb-8">
        <p className="type-label text-primary">Team</p>
        <SectionHeader
          title="Meet our experts"
          description="Local advisors across homes, rentals, and plots."
          action={{ label: "View all", href: "/team" }}
          actionVariant="secondary"
          actionAlwaysVisible
        />
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {members.slice(0, 3).map((m) => (
          <li key={m.id}>
            <Link
              href={`/team/${m.slug}`}
              className="group flex items-center gap-4 border border-header-stroke rounded-card p-3 bg-2nd-bg hover:border-primary/40 transition-colors"
            >
              <div className="relative size-16 shrink-0 rounded-media overflow-hidden bg-black">
                <Image
                  src={m.photo}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="64px"
                  aria-hidden
                />
              </div>
              <div className="min-w-0">
                <p className="type-body font-semibold text-body group-hover:text-primary truncate">
                  {m.name}
                </p>
                <p className="type-caption text-secondary-text truncate">
                  {m.role}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
