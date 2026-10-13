import type { CSSProperties, ReactNode } from "react";

/**
 * iPhone 15 Pro benzeri cihaz çerçevesi.
 *
 * Köşe yarıçapları px değil YÜZDE (`14.2% / 6.56%` gibi) verilir: yatay yarıçap
 * genişliğin, dikey yarıçap yüksekliğin yüzdesidir. Ekran oranı 390/844 sabit
 * olduğu için bu iki yüzde aynı px değerine denk gelir ve çerçeve her genişlikte
 * (mobilde 190px, masaüstünde 300px) bozulmadan ölçeklenir. Eski çözümdeki
 * `rounded-[40px] sm:rounded-[50px]` kırılma noktalarına gerek kalmaz.
 *
 * Ekran görüntüleri Dynamic Island'ı zaten içerdiği için çerçeve ayrıca
 * çentik/island çizmez.
 */

const SCREEN_RATIO = "390 / 844";

const railStyle: CSSProperties = {
  borderRadius: "14.2% / 6.56%",
  padding: "1.15%",
};

const bezelStyle: CSSProperties = {
  borderRadius: "13.4% / 6.19%",
  padding: "2.4%",
};

const screenStyle: CSSProperties = {
  borderRadius: "11.6% / 5.34%",
  aspectRatio: SCREEN_RATIO,
};

type Props = {
  children: ReactNode;
  /** Genişliği belirleyen sınıflar — ör. "w-[220px] lg:w-[300px]" */
  className?: string;
  /** Ekran üzerindeki cam yansıması (varsayılan açık) */
  glare?: boolean;
  /** Yan tuşlar (varsayılan açık) */
  buttons?: boolean;
};

export default function PhoneFrame({
  children,
  className = "",
  glare = true,
  buttons = true,
}: Props) {
  return (
    <div className={`relative ${className}`}>
      {buttons && <SideButtons />}

      {/* titanyum kasa kenarı */}
      <div
        className="relative bg-gradient-to-br from-zinc-300 via-zinc-500 to-zinc-700 shadow-[0_60px_110px_-45px_rgba(0,0,0,0.85),0_18px_40px_-24px_rgba(0,0,0,0.55)]"
        style={railStyle}
      >
        {/* kasanın üst kenarındaki ışık çizgisi */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/25 mix-blend-overlay"
          style={{ borderRadius: railStyle.borderRadius }}
        />

        {/* siyah çerçeve (bezel) */}
        <div className="relative bg-[#0b0b0d]" style={bezelStyle}>
          <div className="relative overflow-hidden bg-black" style={screenStyle}>
            {children}

            {glare && (
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-x-1/4 -top-1/4 h-[85%] rotate-[18deg] bg-gradient-to-b from-white/12 via-white/4 to-transparent"
              />
            )}

            {/* ekran kenarındaki ince iç hat */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10"
              style={{ borderRadius: screenStyle.borderRadius }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Sol: aksiyon tuşu + ses tuşları, sağ: güç tuşu. */
function SideButtons() {
  const base =
    "pointer-events-none absolute w-[1.6%] rounded-[2px] bg-gradient-to-b from-zinc-400 via-zinc-600 to-zinc-500";

  return (
    <span aria-hidden>
      {/* aksiyon tuşu */}
      <span className={`${base} -left-[0.9%] top-[14.5%] h-[3.4%]`} />
      {/* ses + */}
      <span className={`${base} -left-[0.9%] top-[21%] h-[6.5%]`} />
      {/* ses - */}
      <span className={`${base} -left-[0.9%] top-[29.5%] h-[6.5%]`} />
      {/* güç */}
      <span className={`${base} -right-[0.9%] top-[24%] h-[10%]`} />
    </span>
  );
}
