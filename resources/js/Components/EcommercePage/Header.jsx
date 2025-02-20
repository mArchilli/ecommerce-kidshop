const Header = () => {
    return (
      <header className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Mi Tienda</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="hover:text-gray-300">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Productos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Acerca de
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Contacto
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    )
  }
  
  export default Header
  
  