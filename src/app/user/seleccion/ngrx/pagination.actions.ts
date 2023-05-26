import { createAction, props } from '@ngrx/store';
import { SearchPagination } from '@app/core/models/SearchPagination.model';

export const set = createAction('[Pagination] Set', props<{ value: SearchPagination }>());
