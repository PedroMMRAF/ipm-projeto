import React, { useState, useEffect } from 'react';

export default function SearchComponent() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (query.length > 0) {
            // Debounce the search for better performance (optional)
            const timeoutId = setTimeout(() => {
                // Fetch search results from your data source or API
                fetchResults(query).then(data => {
                    setResults(data);
                });
            }, 500);

            // Cleanup function to cancel the timeout if the query changes
            return () => clearTimeout(timeoutId);
        } else {
            setResults([]); // Clear results if query is empty
        }
    }, [query]);

    const fetchResults = async (searchQuery) => {
        // Replace with your actual search logic or API call
        // For example, `fetch('/api/search?query=' + encodeURIComponent(searchQuery))`
        // This is a placeholder for demonstration
        return [
            // Mocked search results
            { id: 1, name: 'Result 1' },
            { id: 2, name: 'Result 2' },
            // ... more results
        ];
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
            />

            <div>
                {results.length > 0 && (
                    <ul>
                        {results.map((result) => (
                            <li key={result.id}>{result.name}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};