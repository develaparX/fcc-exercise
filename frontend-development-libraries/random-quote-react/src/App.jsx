import { useState, useEffect } from 'react';

const url = 'https://quotes15.p.rapidapi.com/quotes/random/?language_code=en';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': 'edbe18b5b8msh36cec68f2c06816p19ce63jsndb964f1513cf',
    'x-rapidapi-host': 'quotes15.p.rapidapi.com'
  }
};

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data)
      setQuote(data.content); 
      setAuthor(data.originator ? data.originator.name : 'Unknown');
    } catch (error) {
      console.error('Error fetching quote:', error);
      setQuote('Failed to fetch quote.');
      setAuthor('');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuote()
  }, []);

  return (
    <div className='quote-box' style={styles.container}>
      <p style={styles.quote}>{loading ? 'Loading...' : `"${quote}"`}</p>
      {author && <h4 style={styles.author}>-- {author} --</h4>}
      <button onClick={fetchQuote} style={styles.button} disabled={loading}>
        {loading ? 'Fetching...' : 'New Quote'}
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
    width:'750px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    backgroundColor:"grey",
    borderRadius:"10px"
  },
  quote: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    maxWidth: '600px',
  },
  author: {
    fontSize: '1rem',
    marginTop: '10px',
    color: 'white',

  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    transition: 'background 0.3s',
  }
};

export default App;
