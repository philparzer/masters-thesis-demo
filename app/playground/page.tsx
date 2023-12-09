import AnnotationPlayground from "@/components/annotation-playground";
import Header from "@/components/header";
import TestCompletion from "@/components/test-completion";
import TextSections from "@/components/text-sections";

export default function Home() {
  return (
    <main className="max-w-[1000px]">
      <Header />
      <AnnotationPlayground />
      <TextSections />
      <TestCompletion />
    </main>
  );
}
