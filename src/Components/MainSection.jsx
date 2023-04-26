import React, { useEffect, useState } from 'react'
import gif from '../Images/loading.gif'



const MainSection = () => {
    // loading state  https://swapi.dev/api/films
    const [loading, setLoading] = useState(true);

    // data state
    const [data, setData] = useState(null);

    // error state
    const [error, setError] = useState(null);


    // fetching the data from an API
    useEffect(() => {
        fetch('https://swapi.dev/api/films')
            .then((response) => {
                if (!response.ok) {
                    alert('This is an HTTP Error: The status is ${response.status}');
                    throw new Error('This is an HTTP Error: The status is ${response.status}');
                }
                return response.json();
            })

            .then((actualData) => {
                setData(actualData.results)
                setError(null)

            })
            .catch((error) => {
                console.log(error);
                setError(error)
                setData(null)
            })
            .finally(() => {
                setLoading(false);
            })

    }, [])


    return (
        <div>
            {loading && <div><img className='loading' src={gif} alt="loading gif" /></div>}
            {error && <div>{'There is a problem fetching your data - ${error}'}</div>}
            <ul className='movies-container'>
                {data &&
                    data.map((item) => {
                        return (
                            <li className='each-movie' key={item.episode_id}>
                                <h3 className='movie-title'>{item.title}</h3>
                                <p className="movie-date">{new Date(item.release_date)
                                    .toLocaleDateString('en-Us', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                <p className="movie-summary">{item.opening_crawl}</p>
                                <div className='line'></div>
                                <button className="info-link">More Info</button>
                            </li>
                        );
                    })}
            </ul>

        </div>
    );
};




export default MainSection
