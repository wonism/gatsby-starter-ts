import { Dispatch, SetStateAction } from 'react';
import { EMPTY, Observable } from 'rxjs';
import { AjaxError } from 'rxjs/ajax';

import { RequestStatus } from '@models/common';

type SetStatus = Dispatch<SetStateAction<RequestStatus>>;
type SetErrorMessage = Dispatch<SetStateAction<string | null>>;

export const catchErr = (setStatus: SetStatus, setErrorMessage: SetErrorMessage): (error: AjaxError) => Observable<null> => (
  (error: AjaxError): Observable<null> => {
    const { message } = error;

    setStatus(RequestStatus.FAIL);
    setErrorMessage(message);

    return EMPTY;
  }
);
