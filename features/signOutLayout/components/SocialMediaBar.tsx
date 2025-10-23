import { IconName } from "@/icons/iconTypes";
import SocialMediaIconPicker from "./SocialMediaIconPicker";
import IconWrapper from "@/components/IconWrapper";

const socialLinks: { name: IconName; url: string }[] = [
  { name: "facebook", url: "https://www.facebook.com/groups/3792300160870421" },
  { name: "instagram", url: "https://www.instagram.com/devstock.pl/" },
  { name: "linkedin", url: "https://www.linkedin.com/company/devstockspzoo/mycompany/" },
  { name: "youtube", url: "https://www.youtube.com/@devstock" },
  { name: "github", url: "https://github.com/Devstock-Academy" },
  { name: "tiktok", url: "https://www.tiktok.com/@devstockacademy" },
];

const SocialMediaBar = () => {
  return (
    <div className="flex justify-end gap-8 px-10 py-2.5 h-10 bg-darkBg">
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition"
        >
          <IconWrapper size={20} className="text-white">
            <SocialMediaIconPicker name={link.name} />
          </IconWrapper>
        </a>
      ))}
    </div>
  );
};

export default SocialMediaBar;
