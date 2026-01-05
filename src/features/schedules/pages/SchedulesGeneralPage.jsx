import React, { useState } from "react";
import { Users, FileText, Building2 } from "lucide-react";
import SchedulesInstructorPage from "./SchedulesInstructorPage";
import SchedulesRecordPage from "./SchedulesRecordPage";
import SchedulesAmbientePage from "./SchedulesAmbientePage";

const tabs = [
  {
    id: "instructores",
    label: "Horarios de Instructores",
    icon: Users,
    component: SchedulesInstructorPage
  },
  {
    id: "fichas",
    label: "Horarios de Fichas",
    icon: FileText,
    component: SchedulesRecordPage
  },
  {
    id: "ambientes",
    label: "Horarios de Ambientes",
    icon: Building2,
    component: SchedulesAmbientePage
  }
];

export default function SchedulesGeneralPage() {
  const [activeTab, setActiveTab] = useState("instructores");

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Gestión de Horarios
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Consulta y administra los horarios de instructores, fichas y ambientes
          </p>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Horario: 3-2025
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                  isActive
                    ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="p-6">
          {ActiveComponent && <ActiveComponent />}
        </div>
      </div>
    </div>
  );
}
