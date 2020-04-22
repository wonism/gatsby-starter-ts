import React, { useContext, useMemo, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';

import { RequestStatus } from '@models/common';
import { Book } from '@models/iceAndFire';
import Context, { State } from '@contexts/books';
import { getBook } from '@remotes/iceAndFire';
import Head from '@shared/Head';
import useAsync from '@hooks/common/useAsync';

import Description from './Description';

type Props = RouteComponentProps<{ id: string }>;

const Detail = ({ id }: Props): React.ReactElement => {
  console.log(id);
  const [, setState] = useContext(Context);
  const [book, status, errorMessage, request] = useAsync.simple<Book | null, typeof getBook>(getBook);

  useEffect(() => {
    if (book == null) {
      return;
    }

    setState((state): State => ({ ...state, book }));

    return (): void => {
      setState((state): State => ({ ...state, book: undefined }));
    };
  }, [book, setState]);

  useEffect(() => {
    request(id!); // eslint-disable-line @typescript-eslint/no-non-null-assertion
  }, [id, request]);

  useEffect(() => {
    if (errorMessage != null) {
      if (confirm(`${errorMessage}\nWould you try again?`)) {
        request(id!); // eslint-disable-line @typescript-eslint/no-non-null-assertion
      }
    }
  }, [errorMessage, request, id]);

  const content = useMemo(() => {
    switch (status) {
      case RequestStatus.IDLE:
      case RequestStatus.SENT:
        return (
          <p>
            Loading...
          </p>
        );
      case RequestStatus.FAIL:
        return (
          <p>
            Failed to fetch data.
          </p>
        );
      case RequestStatus.DONE:
        return (
          <Description />
        );
      default:
        return null;
    }
  }, [status]);

  return (
    <>
      <Head title={`Book #${id}`} hide />
      {content}
    </>
  );
};

export default Detail;
