import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTeamMembers } from "@/lib/team";
import { whatsappHref, telHref } from "@/lib/contact";
import { FaWhatsapp } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Our Experts | 2% Company",
  description:
    "Meet the 2% Company team helping buyers, sellers, tenants, and investors across Patna.",
};

export default async function TeamPage() {
  const members = await getTeamMembers();

  return (
    <div className="bg-main-bg text-body border-b border-header-stroke">
      <section className="page-px section-y space-y-10">
        <div className="max-w-2xl space-y-3">
          <p className="type-label text-primary font-semibold tracking-[0.14em]">
            Our experts
          </p>
          <h1 className="type-display text-body">People behind 2% Company</h1>
          <p className="type-body text-secondary-text">
            Local advisors for homes, rentals, and plots — reach them directly
            on WhatsApp or phone.
          </p>
        </div>

        {members.length === 0 ? (
          <p className="type-body text-secondary-text">
            Team profiles coming soon.{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact us
            </Link>{" "}
            in the meantime.
          </p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member) => (
              <li key={member.id}>
                <article className="h-full flex flex-col border border-header-stroke rounded-card overflow-hidden bg-2nd-bg">
                  <Link
                    href={`/team/${member.slug}`}
                    className="relative block aspect-[4/3] bg-black"
                  >
                    <Image
                      src={member.photo}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      aria-hidden
                    />
                  </Link>
                  <div className="flex flex-col flex-1 gap-3 p-5">
                    <div>
                      <h2 className="type-card-title text-body">
                        <Link
                          href={`/team/${member.slug}`}
                          className="hover:text-primary transition-colors"
                        >
                          {member.name}
                        </Link>
                      </h2>
                      <p className="type-caption text-primary mt-1">
                        {member.role}
                      </p>
                    </div>
                    <p className="type-caption text-secondary-text line-clamp-3">
                      {member.bio}
                    </p>
                    {member.areas.length > 0 && (
                      <p className="type-caption text-secondary-text">
                        Areas: {member.areas.join(", ")}
                      </p>
                    )}
                    <div className="mt-auto flex flex-wrap gap-2 pt-2">
                      {member.phone && (
                        <>
                          <a
                            href={whatsappHref(
                              `Hi ${member.name}, I'd like to talk about a property in Patna.`,
                              member.phone
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-control bg-primary text-on-primary type-caption font-semibold"
                          >
                            <FaWhatsapp size={14} aria-hidden />
                            WhatsApp
                          </a>
                          <a
                            href={telHref(member.phone)}
                            className="inline-flex items-center px-3 py-2 rounded-control border border-header-stroke type-caption font-semibold text-secondary-text hover:text-body"
                          >
                            Call
                          </a>
                        </>
                      )}
                      <Link
                        href={`/team/${member.slug}`}
                        className="inline-flex items-center px-3 py-2 rounded-control border border-header-stroke type-caption font-semibold text-secondary-text hover:text-body"
                      >
                        View profile
                      </Link>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
