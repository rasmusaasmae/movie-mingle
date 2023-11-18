import Image from "next/image";
import { twMerge } from "tailwind-merge";
type BackgroundImageProps = {
  alt: string;
  src: string;
  children: React.ReactNode;
  className?: string;
};
export default function BackgroundImageContainer(props: BackgroundImageProps) {
  return (
    <div className={twMerge("relative", props.className)}>
      <Image
        alt={props.alt}
        src={props.src}
        fill
        className="h-full object-cover aspect-video opacity-30 dark:opacity-20 pointer-events-none"
      />
      {props.children}
    </div>
  );
}
