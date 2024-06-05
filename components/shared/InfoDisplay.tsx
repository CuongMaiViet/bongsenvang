import React from "react";

type InfoDisplayProps = {
  title: string;
  titleSize?: number;
  children: React.ReactNode;
};
const InfoDisplay = ({ title, titleSize = 20, children }: InfoDisplayProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className={`p-bold-${titleSize} text-grey-600`}>{title}</p>
      <div className="p-medium-16 lg:p-regular-18 text-justify whitespace-pre-wrap">
        {children}
      </div>
    </div>
  );
};

export default InfoDisplay;
