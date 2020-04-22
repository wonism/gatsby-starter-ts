import React, { useContext, useMemo, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';

import { RequestStatus } from '@models/common';
import { Character } from '@models/iceAndFire';
import Context, { State } from '@contexts/characters';
import { getCharacter } from '@remotes/iceAndFire';
import Head from '@shared/Head';
import useAsync from '@hooks/common/useAsync';

import Description from './Description';

type Props = RouteComponentProps<{ id: string }>;

const Detail = ({ id }: Props): React.ReactElement => {
  const [, setState] = useContext(Context);
  const [character, status, errorMessage, request] = useAsync.simple<Character | null, typeof getCharacter>(getCharacter);

  useEffect(() => {
    if (character == null) {
      return;
    }

    setState((state): State => ({ ...state, character }));

    return () => {
      setState((state): State => ({ ...state, character: undefined }));
    };
  }, [character, setState]);

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
      <Head title={`Character #${id}`} hide />
      {content}
    </>
  );
};

export default Detail;
