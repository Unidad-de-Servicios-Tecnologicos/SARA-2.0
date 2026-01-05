import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-14 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

        <div>
          <h4 className="text-2xl font-bold text-green-400">SARA</h4>
          <p className="text-sm text-gray-400">
            Centro de Servicios y Gestión Empresarial
          </p>
        </div>

        <div className="space-y-3 text-sm text-gray-300">
          <div className="flex gap-2">
            <MapPin className="h-4 w-4 text-green-400" />
            Calle 51 #57-70, Medellín
          </div>
          <div className="flex gap-2">
            <Phone className="h-4 w-4 text-green-400" />
            PBX: +57 601 5461500
          </div>
          <div className="flex gap-2">
            <Mail className="h-4 w-4 text-green-400" />
            contacto@sara-sena.edu.co
          </div>
        </div>

        <div>
          <p className="font-semibold mb-4">Síguenos</p>
          <div className="flex gap-4 text-gray-300">
            <Instagram />
            <Facebook />
            <Twitter />
            <Youtube />
            <Linkedin />
          </div>
        </div>

      </div>

      <p className="text-center text-xs text-gray-500 mt-10">
        © 2025 SARA · SENA
      </p>
    </footer>
  );
};

export default Footer;
