import AnnotationPlaygroundPreview from "@/components/annotation-playground-preview";
import Header from "@/components/header";
import TextSections from "@/components/text-sections";

export default function Home() {
  return (
    <main className="max-w-[1000px]">
      <Header />
      <AnnotationPlaygroundPreview />
      <TextSections />
    </main>
  );
}
