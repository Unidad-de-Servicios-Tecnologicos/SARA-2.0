import React from "react";
import { Link } from "react-router-dom";
import logoSura from "../../../assets/logo-sena.png";

const Header = () => {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <div className="flex items-center gap-3">
          <img
            src={logoSura}
            alt="Logo SURA"
            className="h-12 w-auto"
          />
          <div>
            <p className="text-2xl font-extrabold text-green-700">SARA</p>
            <p className="text-xs text-gray-500">
              Sistema de Gestión Educativa
            </p>
          </div>
        </div>

        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <a href="#features" className="text-gray-600 hover:text-green-600">
            Funcionalidades
          </a>
          <a href="#contact" className="text-gray-600 hover:text-green-600">
            Contacto
          </a>
          <Link
            to="/auth/login"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Ingresar
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
