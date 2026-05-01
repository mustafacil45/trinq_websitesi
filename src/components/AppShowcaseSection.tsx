"use client";

import { motion } from "framer-motion";

const SCREENS = [
  { src: "/app-anasayfa.png", alt: "trinQ ana sayfa" },
  { src: "/app-kampanyalar.png", alt: "trinQ kampanyalar" },
  { src: "/app-harcamalar.png", alt: "trinQ harcamalar" },
  { src: "/app-magazalar.png", alt: "trinQ mağazalar" },
];

export default function AppShowcaseSection() {
  return (
    <section className="bg-white py-14 sm:py-20 lg:py-28" id="uygulama-vitrini">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold leading-tight text-trinq-navy sm:text-4xl">
            Uygulama Görüntüleri
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-trinq-muted sm:text-lg">
            trinQ ile tüm kafeler tek uygulamada. Sadakat kartları ve kampanyalar cebinde.
          </p>
        </motion.div>

        <div className="mt-10 flex flex-wrap items-end justify-center gap-4 sm:mt-16 sm:gap-6 lg:gap-8">
          {SCREENS.map((screen, i) => (
            <motion.div
              key={screen.src}
              className="relative w-[136px] cursor-default min-[375px]:w-[150px] sm:w-[220px] md:w-[240px] lg:w-[250px]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                opacity: { duration: 0.45, delay: i * 0.1, ease: "easeOut" },
              }}
              whileHover={{ y: -6 }}
            >
              {/* iPhone 16 Pro çerçevesi - Hero ile aynı, çentik yok */}
              <div className="relative overflow-hidden rounded-[32px] border-[7px] border-zinc-800 bg-zinc-900 shadow-2xl sm:rounded-[52px] sm:border-[10px]">
                <div
                  className="relative flex w-full items-center justify-center overflow-hidden rounded-[25px] bg-black sm:rounded-[42px]"
                  style={{ aspectRatio: "390/844" }}
                >
                  <img
                    src={screen.src}
                    alt={screen.alt}
                    className="h-full w-full object-contain object-center"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
