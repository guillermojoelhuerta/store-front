import { createReducer, on } from '@ngrx/store';
import { set } from './pagination.actions';
import { PaginationState } from './pagination.state';

export const initialState: PaginationState = {
  pagination: {
    page:0,
    search:'',
    searchBy:'',
    size:12,
    sortBy:"name,desc"
  }
};

export const paginationReducer = createReducer(
  initialState,
  on(set, (state, { value }) => ({ ...state, pagination: value }))
);
