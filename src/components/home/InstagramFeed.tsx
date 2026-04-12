import { CLINIC } from "@/lib/clinic";
import InstagramBanner from "@/components/home/InstagramBanner";

export default async function InstagramFeed() {
  return (
    <InstagramBanner instagramUrl={CLINIC.instagramUrl} handle={CLINIC.instagram} />
  );
}
