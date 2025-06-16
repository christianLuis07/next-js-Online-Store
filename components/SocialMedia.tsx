import { Github, Instagram, Linkedin, Youtube } from "lucide-react";
import { title } from "process";
import React from "react";
import { Tooltip, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}

const socialLink = [
  {
    title: "Github",
    href: "https://github.com/christianLuis07",
    icon: <Github className="w-5 h-5" />,
  },
  {
    title: "Linkedin",
    href: "https://www.linkedin.com/in/christian-luis-paskalis-ginting-85abbb2a2/",
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    title: "Instagram",
    href: "https://www.instagram.com/christianlluis",
    icon: <Instagram className="w-5 h-5" />,
  },
  {
    title: "Youtube",
    href: "https://www.youtube.com/@christianluis1248",
    icon: <Youtube className="w-5 h-5" />,
  },
];

const SocialMedia = ({ className, iconClassName, tooltipClassName }: Props) => {
  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-3.5", className)}>
        {socialLink.map((item) => (
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                key={item?.title}
                href={item?.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "p-2 border rounded-full hover:text-white hover:border-shop_light_green",
                  iconClassName
                )}
              >
                {item?.icon}
              </Link>
            </TooltipTrigger>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default SocialMedia;
