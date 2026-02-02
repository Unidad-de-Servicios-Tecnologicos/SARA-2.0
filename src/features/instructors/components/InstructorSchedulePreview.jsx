import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Calendar, Clock, MapPin } from "lucide-react";

const mockHorarioPorFicha = {
	"2889927": [
		{ dia: "Lunes", franja: "06:00 - 10:00", ambiente: "Ambiente 401" },
		{ dia: "Miércoles", franja: "06:00 - 10:00", ambiente: "Ambiente 401" },
	],
	"2891234": [
		{ dia: "Martes", franja: "14:00 - 18:00", ambiente: "Ambiente 305" },
		{ dia: "Jueves", franja: "14:00 - 18:00", ambiente: "Ambiente 305" },
	],
	"2890543": [
		{ dia: "Lunes", franja: "10:00 - 12:00", ambiente: "Ambiente 210" },
	],
	"2892001": [
		{ dia: "Sábado", franja: "08:00 - 12:00", ambiente: "Ambiente 502" },
	],
	"2892345": [
		{ dia: "Viernes", franja: "18:00 - 22:00", ambiente: "Ambiente 303" },
	],
	"2893456": [
		{ dia: "Martes", franja: "18:00 - 22:00", ambiente: "Ambiente 120" },
	],
	"2894567": [
		{ dia: "Miércoles", franja: "10:00 - 14:00", ambiente: "Ambiente 220" },
	],
};
export default function InstructorSchedulePreview({ isOpen, onClose, instructor, ficha }) {
	if (!isOpen || !ficha) return null;
	const key = ficha.numero?.toString();
	const bloques = mockHorarioPorFicha[key] || [];
	return (
	<Dialog open={isOpen} onOpenChange={onClose}>
	<DialogContent className="max-w-xl max-h-[70vh] overflow-hidden flex flex-col">
	<DialogHeader className="border-b border-gray-200 dark:border-gray-700">
		  <div>
			<DialogTitle className="text-lg">
			  Horario de Ficha {ficha.numero}
			</DialogTitle>
			<p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
			  {ficha.programa}
			  {instructor && ` • Instructor: ${instructor.nombre} ${instructor.apellidos}`}
			</p>
		  </div>
	</DialogHeader>
	<div className="flex-1 overflow-y-auto p-4 space-y-4">
		  {bloques.length > 0 ? (
			<div className="space-y-3">
			  {bloques.map((b, idx) => (
				<div
				  key={idx}
				  className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 flex items-start justify-between gap-3 bg-gray-50 dark:bg-gray-800/60"
				>
				  <div className="flex items-center gap-3">
					<Calendar className="w-5 h-5 text-blue-500" />
					<div>
					  <p className="text-sm font-semibold text-gray-900 dark:text-white">
						{b.dia}
					  </p>
					  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 mt-1">
						<Clock className="w-4 h-4" />
						<span>{b.franja}</span>
					  </div>
					</div>
				  </div>
				  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
					<MapPin className="w-4 h-4" />
					<span>{b.ambiente}</span>
				  </div>
				</div>
			  ))}
			</div>
		  ) : (
			<div className="flex flex-col items-center justify-center py-10 text-center">
			  <Calendar className="w-10 h-10 text-gray-300 dark:text-gray-600 mb-3" />
			  <p className="text-sm text-gray-500 dark:text-gray-400">
				No hay horario configurado para esta ficha en el mock.
			  </p>
			</div>
		  )}
	</div>
	</DialogContent>
	</Dialog>
	);
}
