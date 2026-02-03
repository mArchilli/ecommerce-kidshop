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
    <div className="w-full h-full">
      <div className="bg-white/90 backdrop-blur rounded-2xl shadow border overflow-hidden h-full flex flex-col">
        {/* Encabezado coherente con Map */}
        <div className="bg-gradient-to-r from-black to-gray-800 text-white px-6 py-4 flex items-center gap-3">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <h2 className="text-xl font-semibold">Contacto</h2>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          {/* Alert éxito */}
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

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-5">
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

            <div className="pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-black hover:bg-white text-white hover:text-black font-medium py-3 px-6 rounded-full border border-black transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Enviando..." : "Enviar mensaje"}
              </button>
            </div>
          </form>

          {/* Información adicional para rellenar espacio en desktop */}
          <div className="mt-8 border-t pt-6 h-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Información adicional</h3>
            
              <div className="p-4 rounded-lg border">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gray-700 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 8v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900">Tiempo de respuesta</p>
                    <p className="text-sm text-gray-600">Respondemos dentro de 24 h hábiles al correo proporcionado.</p>
                  </div>
                </div>
              </div>
            
          </div>

        </div>
      </div>
      <ToastContainer />
    </div>
  )
}