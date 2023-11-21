import { createAction, props } from '@ngrx/store';
import { Usuario } from '../models/usuario.model';

export const setUser = createAction(
    '[AUTH] Set User',
    props<{user: Usuario}>()
);

export const unsetUser = createAction(
    '[AUTH] Unset User'
);