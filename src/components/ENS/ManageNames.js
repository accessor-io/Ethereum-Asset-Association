import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { request, gql } from 'graphql-request';

const SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/ensdomains/ens';

function ManageNames() {
  const { address } = useAccount();
  const [names, setNames] = useState([]);

  useEffect(() => {
    async function fetchNames() {
      if (address) {
        const query = gql`
          query getNames($address: String!) {
            domains(where: { owner: $address }) {
              name
            }
          }
        `;
        const { domains } = await request(SUBGRAPH_URL, query, { address: address.toLowerCase() });
        setNames(domains.map(domain => domain.name));
      }
    }
    fetchNames();
  }, [address]);

  return (
    <div>
      <h2>Manage Names</h2>
      {names.length > 0 ? (
        <ul>
          {names.map(name => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      ) : (
        <p>No names found</p>
      )}
    </div>
  );
}

export default ManageNames;
