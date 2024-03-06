import Image from "next/image";
export default function Logo() {
  return (
    <Image
      width={100}
      height={38}
      src={"/assets/images/logo.svg"}
      alt="logo"
      tabIndex={-1}
    />
  );
}
