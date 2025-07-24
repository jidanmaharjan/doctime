
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import Image, { type ImageProps } from "next/image";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      {/* <Image {...rest} src={srcLight} className="imgLight" /> */}
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default function Home() {
  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Welcome to Next.js!</h1>
        <p className="text-lg mb-6">This is a simple example of a Next.js app.</p>
        <ThemeImage
          srcLight="/turborepo-light.svg"
          srcDark="/turborepo-dark.svg"
          alt="Theme Image"
          width={300}
          height={200}
        />
        <Input placeholder="Type something..." className="mt-4" />
        <Button variant={'destructive'} className="mt-6">Click Me!</Button>
      </div>
    </main>
  );
}
