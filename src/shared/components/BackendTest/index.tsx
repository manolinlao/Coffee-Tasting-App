import { useState } from 'react';

export const BackEndTest = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch('http://localhost:3000/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, text }),
    });

    const data = await res.json();
    setMessage(data.message);
    setTitle('');
    setText('');
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Crear nota de cata</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          placeholder="Texto"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <br />
        <button type="submit">Enviar</button>
      </form>
      <p>{message}</p>
    </div>
  );
};
