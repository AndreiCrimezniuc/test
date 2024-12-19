import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import '../styles/search-results.css';

export default function SearchSection() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetch('../data/books.json')
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setFilteredData(data);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className='search-section'>
            <SearchBar
                data={data}
                onFilter={(filtered) => setFilteredData(filtered)}
            />
            <ul>
                {filteredData.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}
