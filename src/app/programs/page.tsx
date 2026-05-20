"use client";

import Link from "next/link";
import { courses } from "@/data/courses";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Award, Clock, Globe2 } from "lucide-react";
import { CourseImage } from "@/components/ui/CourseImage";

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#2E1E1E] py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#FAF6EE] bg-[#800020] px-4 py-1 rounded-full shadow-sm">
            Nalanda Foundation Programs & Certifications
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#2E1E1E] tracking-tight font-serif">
            Internship Streams & Programs
          </h1>
          <p className="text-sm sm:text-base text-[#5C4D4D] leading-relaxed">
            Revive the academic standard of India&apos;s golden heritage. Select from our 12 premium multidisciplinary training paths. Each curriculum includes verified certifications, hands-on projects, and real-time mentor guidance.
          </p>
        </div>

        {/* Highlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((program) => (
            <Card
              key={program.id}
              className="flex flex-col border border-[#D6C7B2] bg-[#FFFDF9] hover:border-[#800020] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden"
            >
              {/* Program Cover Image */}
              <div className="h-44 w-full border-b border-[#D6C7B2]/40 relative overflow-hidden">
                <CourseImage
                  src={program.image}
                  alt={program.title}
                  category={program.category}
                  fill
                  priority={program.id === "program-1" || program.id === "program-2"}
                />
                <div className="absolute top-3 left-3 bg-[#800020] text-[#FAF6EE] text-[9px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm z-10">
                  {program.category}
                </div>
              </div>

              {/* Card Title Header */}
              <CardHeader className="p-6 pb-2">
                <CardTitle className="text-lg sm:text-xl font-bold font-serif text-[#2E1E1E] line-clamp-1">
                  {program.title}
                </CardTitle>
              </CardHeader>

              {/* Card Details Content */}
              <CardContent className="px-6 py-2 flex-1 space-y-4">
                <p className="text-xs text-[#5C4D4D] line-clamp-2.5 leading-relaxed">
                  {program.description}
                </p>

                {/* Technical specifications */}
                <div className="grid grid-cols-2 gap-2 text-[10px] text-[#5C4D4D] border-t border-[#D6C7B2]/30 pt-3.5">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Clock className="h-3.5 w-3.5 text-[#C35237]" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Globe2 className="h-3.5 w-3.5 text-[#C35237]" />
                    <span>Flexible Mode</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-semibold col-span-2">
                    <Award className="h-3.5 w-3.5 text-[#D97706]" />
                    <span>Verified Internship Certificate</span>
                  </div>
                </div>

                {/* Displaying price crossed out */}
                <div className="flex items-baseline gap-2.5 pt-2">
                  <span className="text-xl font-extrabold text-[#800020]">₹{program.price}</span>
                  <span className="text-xs text-[#5C4D4D] line-through font-semibold">₹{program.originalPrice}</span>
                  <span className="text-[9px] font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded uppercase">
                    Save 40%
                  </span>
                </div>
              </CardContent>

              {/* CTA Button Actions */}
              <CardFooter className="p-6 pt-2 gap-3">
                <Link href={`/programs/${program.slug}`} className="flex-1">
                  <Button variant="outline" className="w-full text-xs h-10 border-[#800020] text-[#800020] hover:bg-[#FAF0D9] font-bold rounded-lg transition-colors">
                    View Details
                  </Button>
                </Link>
                <Link href={`/programs/${program.slug}`} className="flex-1">
                  <Button className="w-full text-xs h-10 bg-[#800020] hover:bg-[#6B1D2F] text-[#FAF6EE] font-bold rounded-lg shadow-sm transition-colors">
                    Enroll Now
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
