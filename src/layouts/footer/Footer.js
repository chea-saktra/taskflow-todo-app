import "./footer.css";
import { FooterNav } from "./FooterNav";

export const Footer = ({ items, activeRoute, onNavigate } = {}) => {
  return FooterNav({
    items,
    activeRoute,
    onNavigate,
  });
};
