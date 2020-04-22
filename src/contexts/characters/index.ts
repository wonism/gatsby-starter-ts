import { createContext, Dispatch, SetStateAction } from 'react';

import { Character } from '@models/iceAndFire';
import { Pair } from '@utils/types';

export interface State {
  characters?: Character[];
  character?: Character;
}

export const initialState: State = {
  characters: undefined,
  character: undefined,
};

const Context = createContext<Pair<State, Dispatch<SetStateAction<State>>>>(
  [initialState, (): State => initialState]
);

export default Context;
