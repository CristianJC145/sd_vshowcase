import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IconProps {
  icon: any;
  className?: string;
}

const AppIcon: React.FC<IconProps> = ({ icon, className = "" }) => {
  return <FontAwesomeIcon className={className} icon={icon} />;
};

export default AppIcon;
