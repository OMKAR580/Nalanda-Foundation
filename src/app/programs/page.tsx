"use client";

import Link from "next/link";
import { Award, Clock, Globe2 } from "lucide-react";
import { courses } from "@/data/courses";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CourseImage } from "@/components/ui/CourseImage";
import { useLanguage } from "@/hooks/useLanguage";

export default function ProgramsPage() {
  const { messages } = useLanguage();

  return (
    <div className="min-h-screen bg-[#FAF6EE] px-4 py-16 font-sans text-[#2E1E1E] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-12">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <span className="inline-block rounded-full bg-[#800020] px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#FAF6EE] shadow-sm">
            {messages.programsPage.badge}
          </span>
          <h1 className="font-serif text-4xl font-extrabold tracking-tight text-[#2E1E1E] sm:text-6xl">
            {messages.programsPage.heading}
          </h1>
          <p className="text-sm leading-relaxed text-[#5C4D4D] sm:text-base">
            {messages.programsPage.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((program) => (
            <Card
              key={program.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-[#D6C7B2] bg-[#FFFDF9] transition-all duration-300 hover:-translate-y-1 hover:border-[#800020] hover:shadow-xl"
            >
              <div className="relative h-44 w-full overflow-hidden border-b border-[#D6C7B2]/40">
                <CourseImage
                  src={program.image}
                  alt={program.title}
                  category={program.category}
                  fill
                  priority={program.id === "program-1" || program.id === "program-2"}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
                <div className="absolute left-3 top-3 z-10 rounded-md bg-[#800020] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#FAF6EE] shadow-sm">
                  {program.category}
                </div>
              </div>

              <CardHeader className="p-6 pb-2">
                <CardTitle className="line-clamp-1 font-serif text-lg font-bold text-[#2E1E1E] sm:text-xl">
                  {program.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 space-y-4 px-6 py-2">
                <p className="line-clamp-2.5 text-xs leading-relaxed text-[#5C4D4D]">
                  {program.description}
                </p>

                <div className="grid grid-cols-2 gap-2 border-t border-[#D6C7B2]/30 pt-3.5 text-[10px] text-[#5C4D4D]">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Clock className="h-3.5 w-3.5 text-[#C35237]" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Globe2 className="h-3.5 w-3.5 text-[#C35237]" />
                    <span>{messages.programsPage.flexibleMode}</span>
                  </div>
                  <div className="col-span-2 flex items-center gap-1.5 font-semibold">
                    <Award className="h-3.5 w-3.5 text-[#D97706]" />
                    <span>{messages.programsPage.certificate}</span>
                  </div>
                </div>

                <div className="flex items-baseline gap-2.5 pt-2">
                  <span className="text-xl font-extrabold text-[#800020]">
                    {"\u20B9"}
                    {program.price}
                  </span>
                  <span className="text-xs font-semibold text-[#5C4D4D] line-through">
                    {"\u20B9"}
                    {program.originalPrice}
                  </span>
                  <span className="rounded border border-green-200 bg-green-50 px-2 py-0.5 text-[9px] font-bold uppercase text-green-700">
                    {messages.common.saveFortyPercent}
                  </span>
                </div>
              </CardContent>

              <CardFooter className="gap-3 p-6 pt-2">
                <Link href={`/programs/${program.slug}`} className="flex-1">
                  <Button
                    variant="outline"
                    className="h-10 w-full rounded-lg border-[#800020] text-xs font-bold text-[#800020] transition-colors hover:bg-[#FAF0D9]"
                  >
                    {messages.common.viewDetails}
                  </Button>
                </Link>
                <Link href={`/programs/${program.slug}`} className="flex-1">
                  <Button className="h-10 w-full rounded-lg bg-[#800020] text-xs font-bold text-[#FAF6EE] shadow-sm transition-colors hover:bg-[#6B1D2F]">
                    {messages.common.enrollNow}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
