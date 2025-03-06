import TermsOfService from "@/components/TermsOfService";

export const metadata = {
  title: "Termos de Serviço",
  description: "Termos de Serviço - Informações sobre nossos termos e condições de uso",
};

export default function TermsPage() {
  return <TermsOfService breadcrumbPath="/cf2" />;
} 