import { useRef, useState, useCallback } from 'react';
import { useObservable, useSubscription } from 'observable-hooks';
import { forkJoin, Observable } from 'rxjs';
import { tap, filter, switchMap, catchError } from 'rxjs/operators';

import { RequestStatus } from '@models/common';
import { catchErr } from '@utils/ajax';
import { ValueOf } from '@utils/types';

type ErrorMessage = string | null;

/* eslint-disable react-hooks/rules-of-hooks */
export default class UseAsync {
  public static all = <T>(
    requested: boolean,
    observables: Record<keyof T, Observable<ValueOf<T>>>
  ): readonly [T | null, RequestStatus, ErrorMessage] => {
    const [status, setStatus] = useState<RequestStatus>(RequestStatus.IDLE);
    const [result, setResult] = useState<T | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubscription = useCallback((result) => {
      setResult(result);
      setStatus(RequestStatus.DONE);
    }, []);

    const resolve$ = useObservable(
      (inputs$) => inputs$.pipe(
        tap(([requested]) => {
          if (requested) {
            setErrorMessage(null);
            setStatus(RequestStatus.SENT);
            setResult(null);
          }
        }),
        filter(([requested]) => requested),
        switchMap(([, observables]) => forkJoin(observables).pipe(
          catchError(catchErr(setStatus, setErrorMessage))
        ))),
      [requested, observables] as const
    );

    useSubscription(resolve$, handleSubscription);

    return [result, status, errorMessage] as const;
  };

  public static simple = <T, F extends (...args: any[]) => Observable<T>>(
    asyncFunction: F
  ): readonly [T | null, RequestStatus, ErrorMessage, (...args: Parameters<F>) => void] => {
    const observableRef = useRef<Observable<T> | null>(null);

    const [result, setResult] = useState<T | null>(null);
    const [status, setStatus] = useState(RequestStatus.IDLE);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubscription = useCallback((result) => {
      setResult(result);
      setStatus(RequestStatus.DONE);
    }, []);

    const resolve$ = useObservable(
      (inputs$) => inputs$.pipe(
        filter(([status]) => status === RequestStatus.SENT && observableRef.current != null),
        tap(() => {
          setErrorMessage(null);
          setResult(null);
        }),
        switchMap(() => observableRef.current!.pipe( // eslint-disable-line @typescript-eslint/no-non-null-assertion
          catchError(catchErr(setStatus, setErrorMessage))
        ))),
      [status] as const
    );

    useSubscription(resolve$, handleSubscription);

    const request = useCallback((...args: Parameters<F>) => {
      observableRef.current = asyncFunction(...args);
      setStatus(RequestStatus.SENT);
    }, [asyncFunction]);

    return [result, status, errorMessage, request] as const;
  };
}
/* eslint-enable react-hooks/rules-of-hooks */
