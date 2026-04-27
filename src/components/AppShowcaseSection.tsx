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
    <section className="bg-background py-20 sm:py-24 lg:py-28" id="uygulama-vitrini">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-trinq-navy sm:text-4xl">
            Uygulama Görüntüleri
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-trinq-muted">
            trinQ ile tüm kafeler tek uygulamada. Sadakat kartları ve kampanyalar cebinde.
          </p>
        </motion.div>

        <div className="mt-16 flex flex-wrap items-end justify-center gap-6 lg:gap-8">
          {SCREENS.map((screen, i) => (
            <motion.div
              key={screen.src}
              className="relative w-[220px] sm:w-[240px] lg:w-[250px] cursor-default"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                opacity: { duration: 0.45, delay: i * 0.1, ease: "easeOut" },
              }}
              whileHover={{ y: -6 }}
            >
              {/* iPhone 16 Pro çerçevesi - Hero ile aynı, çentik yok */}
              <div className="relative overflow-hidden rounded-[52px] border-[10px] border-zinc-800 bg-zinc-900 shadow-2xl">
                <div
                  className="relative flex w-full items-center justify-center overflow-hidden rounded-[42px] bg-black"
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
