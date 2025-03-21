import { useState } from "react"
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validate = () => {
    const newErrors = {}
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|gmail\.com\.ar|hotmail\.com|hotmail\.com\.ar|yahoo\.com|yahoo\.com\.ar)$/;

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido"
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es requerido"
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = "El correo electrónico no es válido o no pertenece a un dominio permitido"
    }

    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es requerido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validate()) {
      setIsSubmitting(true)

      emailjs.sendForm('service_cfurjtg', 'template_o3ehu98', e.target, 'U_qpSj-UVbLA5f0Wb')
        .then((result) => {
          console.log('Formulario enviado:', result.text);
          toast.success('Mensaje enviado con éxito');
          setSubmitSuccess(true);
          setFormData({ name: "", email: "", message: "" });

          // Resetear el mensaje de éxito después de 5 segundos
          setTimeout(() => {
            setSubmitSuccess(false);
          }, 5000);
        }, (error) => {
          console.log('Error al enviar el formulario:', error.text);
          toast.error('Hubo un error al enviar el mensaje. Inténtalo de nuevo.');
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  }

  return (
    <div className="max-w-full mx-auto my-5 p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Contáctanos</h2>

      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded">
          <div className="flex">
            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <p>¡Gracias por tu mensaje! Te contactaremos pronto.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ${
              errors.name
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-gray-200 focus:border-black"
            }`}
            placeholder="Tu nombre"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ${
              errors.email
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-gray-200 focus:border-black"
            }`}
            placeholder="tu@email.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-gray-700 text-sm font-medium mb-2">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ${
              errors.message
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-gray-200 focus:border-black"
            }`}
            placeholder="Escribe tu mensaje aquí..."
          ></textarea>
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-black hover:bg-white text-white hover:text-black font-medium py-3 px-6 rounded-lg border border-black transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Enviando..." : "Enviar mensaje"}
          </button>
        </div>
      </form>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Nos pondremos en contacto contigo lo antes posible</p>
      </div>
      <ToastContainer />
    </div>
  )
}