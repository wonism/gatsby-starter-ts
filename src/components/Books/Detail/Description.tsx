import React, { useContext } from 'react';
import { Link } from 'gatsby';

import Context from '@contexts/books';
import { getIdFromUrl } from '@utils/string';

const Description: React.FC<{}> = () => {
  const [state] = useContext(Context);

  if (state.book == null) {
    return (
      <p>
        There's no book.
      </p>
    );
  }

  return (
    <dl>
      <dt>
        Name
      </dt>
      <dd>
        {state.book.name}
      </dd>
      <dt>
        Characters
      </dt>
      <dd>
        {state.book.characters.length !== 0 ? (
          <ul>
            {state.book.characters.map((character) => {
              const id = getIdFromUrl(character);

              return (
                <li key={id}>
                  <Link to={`/characters/${id}`}>
                    {`Character #${id}`}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : 'N/A'}
      </dd>
    </dl>
  );
};

export default Description;
