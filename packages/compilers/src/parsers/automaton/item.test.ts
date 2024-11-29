import { describe, expect, test } from "vitest";
import { Item } from "./item";
import { EPSILON } from "..";

describe("(Automaton) Item Testing Suite", () => {
    test("Item correctly instantiates dot at the beginning of a production by default", () => {
        const item = new Item({
            nonTerminal: "A",
            production: ["a", "b", "c"],
        });
        expect(item.RHS[0]).toBe("•");
    });

    test("Item can be instantiated with a dot at the defined postion", () => {
        const item = new Item(
            {
                nonTerminal: "A",
                production: ["a", "b", "c"],
            },
            1,
        );
        expect(item.RHS[1]).toBe("•");
    });

    test("Item.getAdjacentSymbol can retrieve the symbol directly right of the dot", () => {
        const item = new Item({
            nonTerminal: "A",
            production: ["a", "b", "c"],
        });
        expect(item.getAdjacentSymbol()).toBe("a");
    });

    test("Item.getAdjacentSymbol returns null if dot is at the end of the production rule", () => {
        const item = new Item(
            {
                nonTerminal: "A",
                production: ["a", "b", "c"],
            },
            3,
        );
        expect(item.getAdjacentSymbol()).toBeNull();
    });

    test("Item.shiftDotRight returns a new Item with the dot shifted by one position to the right", () => {
        const item = new Item({
            nonTerminal: "A",
            production: ["a", "b", "c"],
        });
        const newItem = item.shiftDotRight();
        expect(newItem).not.toBeNull();

        if (newItem) {
            expect(newItem.RHS[1]).toBe("•");
            expect(newItem.RHS).toEqual(["a", "•", "b", "c"]);
        }
    });

    test("Item.shiftDotRight returns null if the item is complete", () => {
        const item = new Item(
            {
                nonTerminal: "A",
                production: ["a", "b", "c"],
            },
            3,
        );
        expect(item.shiftDotRight()).toBeNull();
    });

    test("Item.shiftDotRight returns null if the next item is EPSILON", () => {
        const item = new Item({
            nonTerminal: "A",
            production: [EPSILON],
        });
        expect(item.shiftDotRight()).toBeNull();
    });
});
