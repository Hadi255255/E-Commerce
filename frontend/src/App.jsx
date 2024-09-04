import { useState } from 'react';
// import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <header className="header">
        <a href="/">Syrussia</a>
      </header>
      <main>List Products</main>
    </>
  );
}

export default App;
