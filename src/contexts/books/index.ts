import { createContext, Dispatch, SetStateAction } from 'react';

import { Book } from '@models/iceAndFire';
import { Pair } from '@utils/types';

export interface State {
  books?: Book[];
  book?: Book;
}

export const initialState: State = {
  books: undefined,
  book: undefined,
};

const Context = createContext<Pair<State, Dispatch<SetStateAction<State>>>>(
  [initialState, (): State => initialState]
);

export default Context;
