"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const GALLERY_IMAGES = [
  {
    src: "/b1.png",
    alt: "Bridal couture gown with elegant detailing",
    className: "md:col-span-2 md:row-span-2",
    number: "01",
  },
  {
    src: "/showroom-hero.png",
    alt: "Close-up of bridal fabric and embroidery",
    className: "",
    number: "02",
  },
  {
    src: "/b3.png",
    alt: "Fine details of a couture garment",
    className: "",
    number: "03",
  },
  {
    src: "/b5.png",
    alt: "Elegant bridal fashion editorial",
    className: "md:col-span-2",
    number: "04",
  },
];

export function AtelierGallerySection() {
  const { dict } = useLanguage();
  const content = dict.atelierGallerySection;

  return (
    <section className="relative overflow-hidden border-y border-[#E7E1D9] bg-white py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* Section heading */}
        <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-[1fr_0.7fr] md:items-end md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#9D8974]" />
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#806B55] sm:text-xs">
                {content.tagline}
              </p>
            </div>

            <h2 className="max-w-2xl font-serif text-3xl font-normal leading-tight tracking-tight text-[#211F1C] sm:text-4xl lg:text-5xl xl:text-6xl">
              {content.heading}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="max-w-xl text-sm leading-7 text-[#625D57] sm:text-base sm:leading-8">
              {content.subheading}
            </p>
          </motion.div>
        </div>

        {/* Editorial gallery grid */}
        <div className="grid auto-rows-55 grid-cols-1 gap-3 sm:grid-cols-2 sm:auto-rows-65 md:grid-cols-4 md:auto-rows-55 md:gap-4 lg:auto-rows-67.5">
          {GALLERY_IMAGES.map((image, index) => (
            <motion.article
              key={image.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className={`group relative min-h-0 overflow-hidden bg-[#F0ECE6] ${image.className}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={
                  index === 0
                    ? "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 60vw"
                    : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 30vw"
                }
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />

              <div className="absolute inset-0 bg-linear-to-t from-[#211F1C]/65 via-transparent to-[#211F1C]/5 opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6 lg:p-7">
                <div>
                  <span className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-white/75">
                    {content.imageLabel} {image.number}
                  </span>

                  <h3 className="font-serif text-lg font-normal leading-snug text-white sm:text-xl">
                    {content.imageTitles[index]}
                  </h3>
                </div>

                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/60 text-white transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-[#211F1C]">
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 flex flex-col gap-5 border-t border-[#E7E1D9] pt-7 sm:mt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-xs leading-6 text-[#756C62] sm:text-sm">
            {content.footerNote}
          </p>

          <Link
            href="/all-catalogs"
            className="group inline-flex shrink-0 items-center gap-3 text-xs font-medium uppercase tracking-[0.15em] text-[#211F1C] transition-colors hover:text-[#806B55]"
          >
            {content.primaryCta}
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D8C9B8] transition-all duration-300 group-hover:border-[#211F1C] group-hover:bg-[#211F1C] group-hover:text-white">
              <MoveUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
