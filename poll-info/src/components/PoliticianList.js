import React from 'react';
import { Link } from 'react-router-dom';

const PoliticianList = () => {
  const politicians = [
    { id: 1, name: 'Narendra Modi' },
    { id: 2, name: 'Rahul Gandhi' },
    { id: 3, name: 'Mamata Banerjee' },
    { id: 4, name: 'Amit Shah' },
    { id: 5, name: 'Arvind Kejriwal' }
  ];

  return (
    <div>
      <h1>Politicians</h1>
      <ul>
        {politicians.map(politician => (
          <li key={politician.id}>
            <Link to={`/politician/${politician.id}`}>
              {politician.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PoliticianList;
