import Image from "next/image";
import React from "react";
import Button from "@/components/ui/Button";

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

export type SectionHeaderProps = {
  title: string;
  description?: string;
  showStars?: boolean;
  action?: {
    label: string;
    href: string;
  };
  /** secondary = bordered view-all; primary = solid CTA band style */
  actionVariant?: "primary" | "secondary";
  /** When false, action shows from lg up only (default). */
  actionAlwaysVisible?: boolean;
  className?: string;
  align?: "left" | "center";
};

const SectionHeader = ({
  title,
  description,
  showStars = false,
  action,
  actionVariant = "secondary",
  actionAlwaysVisible = false,
  className,
  align = "left",
}: SectionHeaderProps) => {
  const textAlign =
    align === "center" ? "text-center" : "text-center lg:text-left";

  return (
    <div className={cx("space-y-4", className)}>
      {showStars && (
        <div className={align === "center" ? "flex justify-center" : undefined}>
          <Image
            src="/svg/Stars.svg"
            height={40}
            width={40}
            alt=""
            aria-hidden
            sizes="40px"
            className="size-8 sm:size-10 opacity-70"
          />
        </div>
      )}

      <div
        className={cx(
          "flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-8",
          align === "center" && "lg:flex-col"
        )}
      >
        <div className={cx(textAlign, "prose-measure-wide")}>
          <h2 className="type-section text-body">{title}</h2>
          {description && (
            <p className="text-secondary-text type-body mt-2">{description}</p>
          )}
        </div>

        {action && (
          <Button
            href={action.href}
            variant={actionVariant}
            size="md"
            className={cx(
              "text-nowrap shrink-0",
              !actionAlwaysVisible && "hidden lg:inline-flex"
            )}
          >
            {action.label}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SectionHeader;
