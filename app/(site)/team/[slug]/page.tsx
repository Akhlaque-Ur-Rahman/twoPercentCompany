import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTeamMemberBySlug, getTeamMembers } from "@/lib/team";
import { whatsappHref, telHref } from "@/lib/contact";
import { FaWhatsapp } from "react-icons/fa";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const members = await getTeamMembers();
  return members.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const member = await getTeamMemberBySlug(slug);
  if (!member) return { title: "Expert | 2% Company" };
  return {
    title: `${member.name} | 2% Company`,
    description: member.bio.slice(0, 150),
  };
}

export default async function TeamMemberPage({ params }: Props) {
  const { slug } = await params;
  const member = await getTeamMemberBySlug(slug);
  if (!member) return notFound();

  return (
    <div className="bg-main-bg text-body border-b border-header-stroke">
      <article className="page-px section-y">
        <nav className="mb-6 type-caption text-secondary-text">
          <Link href="/team" className="hover:text-body">
            Our experts
          </Link>
          <span aria-hidden> / </span>
          <span className="text-body">{member.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-phi-4 lg:gap-phi-5">
          <div className="relative aspect-[4/3] rounded-media overflow-hidden border border-header-stroke bg-black">
            <Image
              src={member.photo}
              alt={member.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="space-y-5">
            <div>
              <p className="type-label text-primary">{member.role}</p>
              <h1 className="type-display text-body mt-2">{member.name}</h1>
            </div>
            <p className="type-body text-secondary-text leading-relaxed">
              {member.bio}
            </p>
            {member.areas.length > 0 && (
              <div>
                <p className="type-caption text-secondary-text uppercase tracking-wider">
                  Service areas
                </p>
                <p className="type-body text-body mt-1">
                  {member.areas.join(" · ")}
                </p>
              </div>
            )}
            <div className="flex flex-wrap gap-3 pt-2">
              {member.phone && (
                <>
                  <a
                    href={whatsappHref(
                      `Hi ${member.name}, I'd like to discuss a property.`,
                      member.phone
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-control bg-primary text-on-primary font-semibold type-body"
                  >
                    <FaWhatsapp size={16} aria-hidden />
                    WhatsApp
                  </a>
                  <a
                    href={telHref(member.phone)}
                    className="inline-flex items-center px-5 py-3 rounded-control border border-header-stroke type-body font-semibold text-secondary-text hover:text-body"
                  >
                    Call
                  </a>
                </>
              )}
              <Link
                href="/contact"
                className="inline-flex items-center px-5 py-3 rounded-control border border-header-stroke type-body font-semibold text-secondary-text hover:text-body"
              >
                Contact office
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
