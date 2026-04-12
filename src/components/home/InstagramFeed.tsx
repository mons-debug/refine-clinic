import { CLINIC } from "@/lib/clinic";
import InstagramBanner from "@/components/home/InstagramBanner";

export default async function InstagramFeed() {
  return (
    <section className="py-6 overflow-hidden" style={{ background: "var(--color-neutral)" }}>
      <InstagramBanner instagramUrl={CLINIC.instagramUrl} handle={CLINIC.instagram} />
    </section>
  );
}
