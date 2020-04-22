import { Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

import { Book, Character } from '@models/iceAndFire';

export const getBooks = <T = Book>(): Observable<T[]> => {
  const method = 'GET';
  const url = 'https://anapioficeandfire.com/api/books';

  const request$ = ajax({
    method,
    url,
  }).pipe(
    map<AjaxResponse, T[]>(({ response }) => response)
  );

  return request$;
};

export const getBook = <T = Book>(id: string): Observable<T> => {
  const method = 'GET';
  const url = `https://anapioficeandfire.com/api/books/${id}`;

  const request$ = ajax({
    method,
    url,
  }).pipe(
    map<AjaxResponse, T>(({ response }) => response)
  );

  return request$;
};

export const getCharacters = <T = Character>(): Observable<T[]> => {
  const method = 'GET';
  const url = 'https://anapioficeandfire.com/api/characters';

  const request$ = ajax({
    method,
    url,
  }).pipe(
    map<AjaxResponse, T[]>(({ response }) => response)
  );

  return request$;
};

export const getCharacter = <T = Character>(id: string): Observable<T> => {
  const method = 'GET';
  const url = `https://anapioficeandfire.com/api/characters/${id}`;

  const request$ = ajax({
    method,
    url,
  }).pipe(
    map<AjaxResponse, T>(({ response }) => response)
  );

  return request$;
};
