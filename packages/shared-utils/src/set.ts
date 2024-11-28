export class SetUtilities {
    static union = <T, S extends Set<T>>(sets: S[]) => {
        const unionSet = new Set<T>();
        sets.forEach((set) => {
            for (const item of set) {
                unionSet.add(item);
            }
        });
        return unionSet;
    };

    static intersection = <T>(setA: Set<T>, setB: Set<T>) => {
        const intersectionSet = new Set<T>();
        for (const itemA of setA) {
            if (setB.has(itemA)) {
                intersectionSet.add(itemA);
            }
        }
        return intersectionSet;
    };
}
