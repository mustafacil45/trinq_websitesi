import Header from "@/components/Header";
import Footer from "@/components/Footer";

type LegalTextPageProps = {
  content: string;
};

function getHeading(lines: string[]) {
  const headingLines = lines.slice(1, lines.findIndex((line) => line.trim() === ""));
  return headingLines.join(" ");
}

function renderLine(line: string, index: number, hiddenHeadingLineIndexes: Set<number>) {
  if (!line.trim() || hiddenHeadingLineIndexes.has(index)) {
    return null;
  }

  if (index === 0) {
    return (
      <p key={index} className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-amber-600">
        {line}
      </p>
    );
  }

  if (line.startsWith("• ")) {
    return (
      <h2 key={index} className="mb-4 mt-8 text-xl font-semibold text-slate-900">
        {line.replace("• ", "")}
      </h2>
    );
  }

  if (/^\d+\.\s/.test(line)) {
    return (
      <h2 key={index} className="mb-4 mt-8 text-xl font-semibold text-slate-900">
        {line}
      </h2>
    );
  }

  if (/^\d+\.\d+\.\s/.test(line)) {
    return (
      <p key={index} className="mb-3 font-medium text-slate-700">
        {line}
      </p>
    );
  }

  if (line.startsWith("- ")) {
    return (
      <p key={index} className="mb-2 pl-5 before:-ml-5 before:mr-2 before:content-['•']">
        {line.replace("- ", "")}
      </p>
    );
  }

  const isUpdateLine = line.startsWith("Son Güncelleme:");

  return (
    <p
      key={index}
      className={
        isUpdateLine
          ? "mt-8 border-t border-slate-200 pt-6 text-sm font-medium text-slate-700"
          : "mb-5"
      }
    >
      {line}
    </p>
  );
}

export default function LegalTextPage({ content }: LegalTextPageProps) {
  const lines = content.split("\n");
  const firstBlankIndex = lines.findIndex((line) => line.trim() === "");
  const hiddenHeadingLineIndexes = new Set(
    Array.from({ length: Math.max(firstBlankIndex - 1, 0) }, (_, index) => index + 1),
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 pb-16 pt-28 sm:pb-24 sm:pt-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <article className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-12">
            <h1 className="mb-6 text-3xl font-bold leading-tight text-slate-900 sm:mb-8">
              {getHeading(lines)}
            </h1>

            <div className="space-y-1 text-base leading-relaxed text-slate-600">
              {lines.map((line, index) => renderLine(line, index, hiddenHeadingLineIndexes))}
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
