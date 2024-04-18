const localStorageKey = 'aks_';

export function storeMetaReducers<S, A>(
  key: string,
  reducer: any,
  state: S,
  action: A
): S {
  const storageKey = `${localStorageKey}${key}`;

  if (state === undefined) {
    const persisted = localStorage.getItem(storageKey);
    return persisted ? JSON.parse(persisted) : reducer(state, action);
  }

  const newState = reducer(state, action);
  localStorage.setItem(storageKey, JSON.stringify(newState));
  return newState;
}
