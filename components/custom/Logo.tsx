import Image from "next/image";
export default function Logo() {
  return (
    <Image
      width={0}
      height={0}
      src={"/assets/images/logo.svg"}
      alt="logo"
      tabIndex={-1}
      className="w-[90px] h-auto"
    />
  );
}
