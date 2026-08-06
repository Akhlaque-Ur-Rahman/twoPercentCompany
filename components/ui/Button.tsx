import Link from "next/link";
import React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-on-primary hover:brightness-110 border border-transparent",
  secondary:
    "bg-2nd-bg text-primary border border-header-stroke hover:bg-main-bg",
  ghost: "bg-transparent text-primary border border-transparent hover:brightness-125",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 type-caption font-semibold",
  md: "px-6 py-3 type-body font-semibold",
  lg: "px-8 py-4 type-body font-semibold",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  target?: string;
  rel?: string;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(props, ref) {
    const {
      variant = "primary",
      size = "md",
      className,
      children,
      ...rest
    } = props;

    const classes = cx(
      "group inline-flex items-center justify-center gap-2 font-semibold rounded-control transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg",
      variantClasses[variant],
      sizeClasses[size],
      className
    );

    if ("href" in props && props.href) {
      const { href, onClick, target, rel } = props;
      return (
        <Link
          href={href}
          onClick={onClick}
          target={target}
          rel={rel}
          className={classes}
          ref={ref as React.Ref<HTMLAnchorElement>}
        >
          {children}
        </Link>
      );
    }

    const buttonProps = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button
        type={buttonProps.type ?? "button"}
        className={classes}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...buttonProps}
      >
        {children}
      </button>
    );
  }
);

export default Button;
