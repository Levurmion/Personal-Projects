"use client";

import { cn } from "@repo/shared-utils";
import { forwardRef, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { GridProps } from "./LivingGrid.types";
import { cva, VariantProps } from "class-variance-authority";
import * as d3 from "d3"

const LivingGridVariants = cva("grid h-full w-full", {
    variants: {
        spacing: {
            xs: "",
            s: "",
            m: "",
            l: "",
            xl: "",
        },
    },
});

type LivingGridVariant = VariantProps<typeof LivingGridVariants>;

const cellSize = 30;

export const LivingGrid = forwardRef<SVGSVGElement, GridProps & LivingGridVariant>(
    ({ className, spacing = "m", renderDot, ...props }, ref) => {
        const [svgRect, setSvgRect] = useState<DOMRect | null>(null);
        const svgRef = useRef<SVGSVGElement | null>(null);

        useLayoutEffect(() => {
            if (svgRef.current) {
                setSvgRect(svgRef.current.getBoundingClientRect());
            }
        }, []);

        const xCoordinates = useMemo(() => {
            const xScale = d3.axisBottom()
        })

        return (
            <svg ref={svgRef} className={cn("h-[100vh] w-[100vw]", className)}>
                {svgRect !== null &&
                    new Array(numRows).fill(0).map((_, row) => {
                        return new Array(numCols).fill(0).map((_, col) => {
                            return (
                                <g
                                    width={svgWidth}
                                    transform={`translate(${col * cellSize + px},${row * cellSize + py})`}
                                >
                                    {renderDot()}
                                </g>
                            );
                        });
                    })}
            </svg>
        );
    },
);

export function GridDot() {}
