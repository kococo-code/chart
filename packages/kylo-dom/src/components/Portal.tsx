import React from "react";
import { createPortal } from "react-dom";

export const Portal = ({ children }: { children?: React.ReactNode }) => {
  const target = document.getElementById("portal");
  if (target) {
    return createPortal(children, target);
  }
  return null;
};
