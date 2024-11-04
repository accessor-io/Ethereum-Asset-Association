import React, { useState, useEffect } from 'react';

const DomainList = () => {
    const [domains, setDomains] = useState([]);

    useEffect(() => {
        // Fetch domains from an API or load from props
        const fetchDomains = async () => {
            // Replace with actual API call
            const mockDomains = ['example.com', 'test.org', 'demo.net'];
            setDomains(mockDomains);
        };

        fetchDomains();
    }, []);

    return (
        <div className="component-container">
            <h2>Domain List</h2>
            <ul className="domain-list">
                {domains.map((domain, index) => (
                    <li key={index} className="domain-item">{domain}</li>
                ))}
            </ul>
            {domains.length === 0 && <p>No domains found.</p>}
        </div>
    );
};

export { DomainList };
