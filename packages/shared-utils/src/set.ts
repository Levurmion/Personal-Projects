export class SetUtilities {
    static union = <T>(...sets: Set<T>[]) => {
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
