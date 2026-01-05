import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";

export default function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí luego conectas tu endpoint JWT
    setSent(true);
  };

  if (sent) {
    return (
      <div className="space-y-4">
        <p className="text-green-700 text-sm">
          Si el correo existe, se enviaron instrucciones para recuperar la contraseña.
        </p>
        <Button onClick={onBack} className="w-full">
          Volver al login
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800">
        Recuperar contraseña
      </h2>

      <Input
        type="email"
        placeholder="Correo institucional"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Button className="w-full bg-green-600 hover:bg-green-700">
        Enviar instrucciones
      </Button>

      <button
        type="button"
        onClick={onBack}
        className="text-sm text-gray-500 hover:underline w-full"
      >
        Volver
      </button>
    </form>
  );
}
