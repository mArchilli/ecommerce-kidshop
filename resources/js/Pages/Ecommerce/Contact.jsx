import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_cfurjtg', 'template_o3ehu98', e.target, 'U_qpSj-UVbLA5f0Wb')
      .then((result) => {
        console.log('Formulario enviado:', result.text);
        toast.success('Mensaje enviado con éxito');
      }, (error) => {
        console.log('Error al enviar el formulario:', error.text);
        toast.error('Hubo un error al enviar el mensaje. Inténtalo de nuevo.');
      });

    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="p-6 rounded-lg shadow-md bg-white">
      <h2 className="text-3xl font-bold mb-6 text-center text-black">Contacto</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-black">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50 bg-white text-black"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-black">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50 bg-white text-black"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-black">Mensaje</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50 bg-white text-black"
            rows="6"
            required
          ></textarea>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 bg-black border border-transparent rounded-md font-semibold text-lg text-white uppercase tracking-widest hover:bg-gray-800 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-300 disabled:opacity-25 transition"
          >
            Enviar
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Contact;