import React, {useState, useEffect} from 'react';
import foods from '../fakedata/data';

const useFetch = (catagories) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const data = foods.filter(item => item.catagories === catagories)
    setResponse(data)
  }, []);
  return { response, error };
};

export default useFetch;