import React, { useContext, useMemo, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Link } from 'gatsby';

import { RequestStatus } from '@models/common';
import { Book } from '@models/iceAndFire';
import Context, { State } from '@contexts/books';
import { getBooks } from '@remotes/iceAndFire';
import Head from '@shared/Head';
import useAsync from '@hooks/common/useAsync';
import { getIdFromUrl } from '@utils/string';

type Props = RouteComponentProps<{ id: string }>;

const List: React.FC<Props> = (): React.ReactElement => {
  const [, setState] = useContext(Context);
  const [books, status, errorMessage, request] = useAsync.simple<Book[] | null, typeof getBooks>(getBooks);

  useEffect(() => {
    if (books == null) {
      return;
    }

    setState((state): State => ({ ...state, books }));

    return () => {
      setState((state): State => ({ ...state, books: undefined }));
    };
  }, [books, setState]);

  useEffect(() => {
    request();
  }, [request]);

  useEffect(() => {
    if (errorMessage != null) {
      if (confirm(`${errorMessage}\nWould you try again?`)) {
        request();
      }
    }
  }, [errorMessage, request]);

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
        if ((books?.length ?? 0) === 0) {
          return (
            <p>
              There're no books.
            </p>
          );
        }

        return (
          <ul>
            {books?.map(({ url, name }) => {
              const id = getIdFromUrl(url);

              return (
                <li key={id}>
                  <Link to={`/books/${id}`}>
                    {`#${id} name: ${name}`}
                  </Link>
                </li>
              );
            })}
          </ul>
        );
      default:
        return null;
    }
  }, [status, books]);

  return (
    <>
      <Head title="Books" hide />
      {content}
    </>
  );
};

export default List;
