import { describe, test } from "vitest";
import { Language } from "../language";
import { mockGrammar } from "../tests/mocks";
import { getFirstAndFollowSets } from ".";

describe("getFirstAndFollowSets Testing Suite", () => {
    test("function computes the correct FIRST and FOLLOW sets", () => {
        const language = new Language(mockGrammar);
        const { FIRST, FOLLOW } = getFirstAndFollowSets(language);

        console.log(FIRST);
    });
});
