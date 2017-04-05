type SetState<T> = (setter: (previousState: T) => Partial<T>) => void;

export function AddTemporarily<TState, TProp extends keyof TState, TItem>(
    setState: SetState<TState>,
    prop: TProp,
    item: TItem,
    durationMs: number
): void {
    setState(previousState => {
        const newState: Partial<TState> = {};
        newState[prop] = (previousState[prop] as any).concat(item);
        return newState;
    });

    setTimeout(() => {
            setState(previousState => {
                const newState: Partial<TState> = {};
                newState[prop] = (previousState[prop] as any).filter(previousItem => previousItem !== item);
                return newState;
            });
        }
        , durationMs
    );
}