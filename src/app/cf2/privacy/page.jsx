import PrivacyPolicy from "@/components/PrivacyPolicy";

export const metadata = {
  title: "Política de Privacidade",
  description: "Política de Privacidade - Informações sobre como coletamos e utilizamos seus dados",
};

export default function PrivacyPage() {
  return <PrivacyPolicy breadcrumbPath="/cf2" />;
} 