import { CertificateLookup } from "@/components/members/CertificateLookup";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata = { title: "Certificate verification | NSU ACM SC" };

export default function Page() {
  return (
    <div className="site-container">
      <PageIntro
        eyebrow="Public / Certificate verification"
        title="Check a chapter certificate."
        description="Enter the certificate identifier to request verification of participation or achievement."
      />
      <CertificateLookup />
    </div>
  );
}
