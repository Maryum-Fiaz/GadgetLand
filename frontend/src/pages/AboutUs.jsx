import { MetaData, Container } from "../components/index";

const AboutUs = () => {
  return (
    <Container>
      <MetaData title={"About Us"} />

      <div className="w-full p-8 bg-zinc-50 min-h-screen font-sans text-zinc-900 antialiased">
        <div className="w-full max-w-2xl mx-auto px-4 py-8 font-sans">
          <div className="space-y-8">
            {/* Header */}
            <div className="pb-4 border-b border-zinc-100">
              <h2 className="text-3xl font-black tracking-tight text-zinc-900 font-heading">
                Our Identity
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                The driving vision and tech ecosystem behind GadgetLand.
              </p>
            </div>

            {/* Content */}
            <div className="space-y-6 text-xs font-medium text-zinc-600 leading-relaxed">
              <p>
                Welcome to{" "}
                <span className="text-zinc-900 font-bold">GadgetLand</span>, a
                streamlined digital storefront curated specifically for modern
                tech enthusiasts, builders, and professionals. Engineered with
                an uncompromising focus on clean logic and intuitive user
                pathways, our ecosystem serves as a direct bridge to
                next-generation electronic hardware and components.
              </p>

              <p>
                We reject cluttered setups and traditional marketplace friction.
                Instead, our workspace utilizes lightweight state architectures
                and absolute minimalist design frameworks to provide an
                instantly responsive, layout-driven inventory terminal. Every
                configuration is designed to load instantly and scale
                seamlessly.
              </p>

              <p>
                Driven by architectural integrity and performance, we
                consistently aim to synchronize premium consumer electronics
                with custom desktop environments. Whether you are building
                complex developer rigs or outfitting a minimal workspace, we
                offer an uncompromised standard of delivery.
              </p>
            </div>

            {/* Vision Parameters List */}
            <div className="pt-2 space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                  Core Architecture
                </span>
                <div className="text-xs font-semibold text-zinc-800 py-1">
                  Curated curation, zero template clutter, and performant state
                  synchronization.
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                  System Target
                </span>
                <div className="text-xs font-semibold text-zinc-800 py-1">
                  To bridge the distance between top-tier development hardware
                  and the innovators who build with it.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AboutUs;
