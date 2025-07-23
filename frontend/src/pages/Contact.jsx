import React, { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(() => setSuccess(true));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Contact</h1>
      {success && <p>Thanks for your message!</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-sm">
        <input className="p-2 text-black" name="name" placeholder="Name" onChange={handleChange} />
        <input className="p-2 text-black" name="email" placeholder="Email" onChange={handleChange} />
        <textarea className="p-2 text-black" name="message" placeholder="Message" onChange={handleChange} />
        <button className="bg-purple-600 p-2" type="submit">Send</button>
      </form>
    </div>
  );
}
