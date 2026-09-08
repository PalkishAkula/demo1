import type { AnchorHTMLAttributes, ReactNode } from "react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

type WhatsAppLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  phone: string;
  message: string;
  children: ReactNode;
};

export function WhatsAppLink({ phone, message, children, ...props }: WhatsAppLinkProps) {
  return <a {...props} href={getWhatsAppUrl(phone, message)} rel="noreferrer" target="_blank">{children}</a>;
}
