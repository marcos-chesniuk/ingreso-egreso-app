import { Action, createReducer, on } from '@ngrx/store';
import { setUser, unsetUser } from './auth.actions';
import { Usuario } from '../models/usuario.model';

export interface State {
    user: Usuario | null; 
}

export const initialState: State = {
   user: null
}

const _authReducer = createReducer(initialState,

    on(setUser, (state, {user}) => ({ ...state, user: {...user}})),
    on(unsetUser, state => state = {...state, user: null}),

);

export function authReducer(state: State | undefined, action: Action) {
    return _authReducer(state, action);
}