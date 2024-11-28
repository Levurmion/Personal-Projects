import type { Language } from "../language/language";
import type { Token } from "../types";
import { getFIRST } from "./FIRST";
import { getFOLLOW } from "./FOLLOW";

export const getFIRSTandFOLLOW = <
    GTokens extends readonly Token[] = readonly Token[],
    GNonTerminals extends readonly string[] = readonly string[],
>(
    language: Language<GTokens, GNonTerminals>,
) => {
    const FIRSTSets = getFIRST(language);
    const FOLLOWSets = getFOLLOW(language, FIRSTSets);

    return {
        FIRST: FIRSTSets,
        FOLLOW: FOLLOWSets,
    };
};
