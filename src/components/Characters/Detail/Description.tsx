import React, { useContext } from 'react';
import { Link } from 'gatsby';

import Context from '@contexts/characters';
import { getIdFromUrl } from '@utils/string';

const Description: React.FC<{}> = () => {
  const [state] = useContext(Context);

  if (state.character == null) {
    return (
      <p>
        There's no character.
      </p>
    );
  }

  return (
    <dl>
      <dt>
        Name
      </dt>
      <dd>
        {state.character.name || 'unknown'}
      </dd>
      <dt>
        Gender
      </dt>
      <dd>
        {state.character.gender}
      </dd>
      <dt>
        Books
      </dt>
      <dd>
        {state.character.books.length !== 0 ? (
          <ul>
            {state.character.books.map((book) => {
              const id = getIdFromUrl(book);

              return (
                <li key={id}>
                  <Link to={`/books/${id}`}>
                    {`Book #${id}`}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : 'N/A'}
      </dd>
      <dt>
        TV Series
      </dt>
      <dd>
        {state.character.tvSeries.join(', ') || 'None'}
      </dd>
    </dl>
  );
};

export default Description;
