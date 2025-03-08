import { HTMLAttributes, ReactNode } from "react";

export type TShirtSizes = "xs" | "s" | "m" | "l" | "xl";

export interface GridProps extends HTMLAttributes<SVGSVGElement> {
    renderDot: () => ReactNode;
}

export interface GridPropDot extends HTMLAttributes<SVGCircleElement> {}
