import React from "react";
import {
  BarChart3,
  Users,
  CheckCircle,
  Clock,
  TrendingUp,
  Briefcase,
} from "lucide-react";

const icons = {
  BarChart3,
  Users,
  CheckCircle,
  Clock,
  TrendingUp,
  Briefcase,
};

const FeatureCard = ({ title, description, iconName }) => {
  const Icon = icons[iconName] || CheckCircle;

  return (
    <div className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-green-200 hover:-translate-y-1 transition-all duration-300">
      <div className="h-14 w-14 bg-linear-to-br from-green-100 to-emerald-100 text-green-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
