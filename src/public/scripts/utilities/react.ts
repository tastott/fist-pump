export type SetState<T> = (setter: (previousState: T) => Partial<T>) => void;

export function AddTemporarily<TState, TProp extends keyof TState, TItem, TProps>(
    component: React.Component<TProps, TState>,
    prop: TProp,
    item: TItem,
    durationMs: number
): void {
    component.setState(previousState => {
        const newState: Partial<TState> = {};
        newState[prop] = (previousState[prop] as any).concat(item);
        return newState;
    });

    setTimeout(() => {
            component.setState(previousState => {
                const newState: Partial<TState> = {};
                newState[prop] = (previousState[prop] as any).filter(previousItem => previousItem !== item);
                return newState;
            });
        }
        , durationMs
    );
}

export function AddTemporarilyTest<TState, TProp extends keyof TState, TItem>(
    state: TState,
    prop: TProp,
    item: TItem,
    durationMs: number
): void
{

}