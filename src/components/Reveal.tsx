import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import { createElement } from "react";
import { useReveal } from "../hooks/useReveal";

type RevealProps<T extends ElementType> = {
  as?: T;
  delay?: number;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export function Reveal<T extends ElementType = "div">({
  as,
  delay = 0,
  className = "",
  children,
  ...rest
}: RevealProps<T>) {
  const Component = (as || "div") as ElementType;
  const { ref, visible } = useReveal<HTMLElement>();

  return createElement(
    Component,
    {
      ref,
      className: `transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${className}`,
      style: { transitionDelay: `${delay}ms` },
      ...rest,
    },
    children,
  );
}
