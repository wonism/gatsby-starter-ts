import React, { useContext, useMemo, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Link } from 'gatsby';

import { RequestStatus } from '@models/common';
import { Character } from '@models/iceAndFire';
import Context, { State } from '@contexts/characters';
import { getCharacters } from '@remotes/iceAndFire';
import Head from '@shared/Head';
import useAsync from '@hooks/common/useAsync';
import { getIdFromUrl } from '@utils/string';

const List: React.FC<RouteComponentProps> = (): React.ReactElement => {
  const [, setState] = useContext(Context);
  const [characters, status, errorMessage, request] = useAsync.simple<Character[] | null, typeof getCharacters>(getCharacters);

  useEffect(() => {
    if (characters == null) {
      return;
    }

    setState((state): State => ({ ...state, characters }));

    return () => {
      setState((state): State => ({ ...state, characters: undefined }));
    };
  }, [characters, setState]);

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
        if ((characters?.length ?? 0) === 0) {
          return (
            <p>
              There're no characters.
            </p>
          );
        }

        return (
          <ul>
            {characters?.map(({ url, name, gender }) => {
              const id = getIdFromUrl(url);

              return (
                <li key={id}>
                  <Link to={`/characters/${id}`}>
                    {`#${id} name: ${name || 'unknown'}, gender: ${gender}`}
                  </Link>
                </li>
              );
            })}
          </ul>
        );
      default:
        return null;
    }
  }, [status, characters]);

  return (
    <>
      <Head title="Characters" hide />
      {content}
    </>
  );
};

export default List;
