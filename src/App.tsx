import {
  Canvas,
  useFrame,
  useThree,
} from "@react-three/fiber";

import {
  Float,
  Html,
  Sparkles,
  RoundedBox,
} from "@react-three/drei";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
} from "react";

import * as THREE from "three";


// ============================================================
// DATA
// ============================================================

const workItems = [
  {
    number: "01",
    title: "Americanbusinessdeveloper",
    description:
      "Software, tools and services for businesses — building practical digital products that ship.",
    tags: ["Product", "Web", "Services"],
  },
  {
    number: "02",
    title: "Open Source",
    description:
      "Small utilities, developer tools and experiments — code that's reusable and well documented.",
    tags: ["OSS", "GitHub", "Tooling"],
  },
  {
    number: "03",
    title: "Clean Engineering",
    description:
      "Code that's readable, maintainable and practical — simple architecture and thoughtful interfaces.",
    tags: ["TypeScript", "Architecture", "DX"],
  },
];

const technologies = [
  "JavaScript",
  "TypeScript",
  "Node.js",
  "Python",
  "Git",
  "Linux",
  "REST APIs",
  "Vite",
];


// ============================================================
// SMALL SVG ICONS
// ============================================================

function ArrowUpRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 .7a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.84 1.23 1.84 1.23 1.07 1.84 2.8 1.31 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .7Z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M14 5h5v5" />
      <path d="M10 14L19 5" />
      <path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
    </svg>
  );
}


// ============================================================
// THREE.JS LAPTOP
// ============================================================

function LaptopScreen() {
  return (
    <group>
      <RoundedBox
        args={[3.8, 2.45, 0.12]}
        radius={0.08}
        smoothness={4}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial
          color="#080d18"
          metalness={0.7}
          roughness={0.25}
          emissive="#071426"
          emissiveIntensity={0.7}
        />
      </RoundedBox>

      <RoundedBox
        args={[3.48, 2.13, 0.04]}
        radius={0.035}
        smoothness={4}
        position={[0, 0, 0.085]}
      >
        <meshBasicMaterial color="#030914" />
      </RoundedBox>

      <Html
        transform
        position={[0, 0, 0.12]}
        distanceFactor={4.3}
        style={{
          width: "420px",
          pointerEvents: "none",
        }}
      >
        <div
          className="code-font rounded-xl border border-cyan-300/10 bg-[#050914]/95 p-5 text-[10px] leading-[1.7] text-slate-400 shadow-2xl"
          style={{
            width: "100%",
            boxShadow:
              "0 0 45px rgba(34,211,238,.08)",
          }}
        >
          <div className="mb-3 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-400/70" />
            <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
            <span className="h-2 w-2 rounded-full bg-green-400/70" />
          </div>

          <div>
            <span className="text-purple-400">const</span>{" "}
            <span className="text-cyan-300">builder</span>{" "}
            = {"{"}
          </div>

          <div className="pl-4">
            <span className="text-slate-500">name:</span>{" "}
            <span className="text-emerald-300">
              "Sandeep"
            </span>
            ,
          </div>

          <div className="pl-4">
            <span className="text-slate-500">stack:</span>{" "}
            <span className="text-emerald-300">
              "full"
            </span>
            ,
          </div>

          <div className="pl-4">
            <span className="text-slate-500">
              mission:
            </span>{" "}
            <span className="text-emerald-300">
              "ship"
            </span>
          </div>

          <div>{"};"}</div>

          <div className="mt-3 text-sky-400">
            // turning ideas into interfaces
          </div>

          <div className="text-purple-400">
            ship<span className="text-white">()</span>;
          </div>
        </div>
      </Html>
    </group>
  );
}

function Laptop() {
  const ref = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    if (!ref.current) return;

    const targetX = pointer.y * 0.18;
    const targetY = pointer.x * 0.24;

    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      targetX,
      0.04
    );

    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      targetY,
      0.04
    );

    ref.current.rotation.z =
      Math.sin(state.clock.elapsedTime * 0.5) * 0.025;
  });

  return (
    <group ref={ref}>
      <group rotation={[-0.12, 0, 0]}>
        <LaptopScreen />

        <group position={[0, -1.42, 0.28]}>
          <RoundedBox
            args={[4.45, 0.18, 2.7]}
            radius={0.08}
            smoothness={4}
          >
            <meshStandardMaterial
              color="#0b1220"
              metalness={0.82}
              roughness={0.22}
            />
          </RoundedBox>

          <RoundedBox
            args={[1.25, 0.025, 0.8]}
            radius={0.025}
            smoothness={2}
            position={[0, 0.105, 0]}
          >
            <meshStandardMaterial
              color="#141e32"
              metalness={0.65}
              roughness={0.2}
              emissive="#172a48"
              emissiveIntensity={0.3}
            />
          </RoundedBox>
        </group>
      </group>
    </group>
  );
}


// ============================================================
// FLOATING CODE PANEL
// ============================================================

function FloatingCodePanel({
  position,
  rotation,
  children,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  children: ReactNode;
}) {
  return (
    <Float
      speed={1.25}
      rotationIntensity={0.25}
      floatIntensity={0.7}
    >
      <group position={position} rotation={rotation}>
        <RoundedBox
          args={[1.9, 1.05, 0.08]}
          radius={0.08}
          smoothness={4}
        >
          <meshStandardMaterial
            color="#09111f"
            metalness={0.45}
            roughness={0.25}
            emissive="#061a2b"
            emissiveIntensity={0.7}
            transparent
            opacity={0.92}
          />
        </RoundedBox>

        <Html
          transform
          position={[0, 0, 0.065]}
          distanceFactor={5}
          style={{
            pointerEvents: "none",
            width: "190px",
          }}
        >
          <div className="code-font rounded-lg border border-white/10 bg-slate-950/90 p-3 text-[8px] leading-relaxed text-slate-400 shadow-xl">
            {children}
          </div>
        </Html>
      </group>
    </Float>
  );
}


// ============================================================
// HERO 3D SCENE
// ============================================================

function HeroScene() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 8],
        fov: 42,
      }}
      dpr={[1, 1.7]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <ambientLight intensity={0.45} />

      <pointLight
        position={[4, 4, 5]}
        intensity={9}
        distance={14}
        color="#38bdf8"
      />

      <pointLight
        position={[-4, -2, 4]}
        intensity={7}
        distance={12}
        color="#8b5cf6"
      />

      <Sparkles
        count={100}
        scale={[12, 8, 8]}
        size={1.5}
        speed={0.25}
        opacity={0.45}
      />

      <Float
        speed={1}
        rotationIntensity={0.08}
        floatIntensity={0.35}
      >
        <Laptop />
      </Float>

      <FloatingCodePanel
        position={[-3.1, 1.7, -0.6]}
        rotation={[0.1, 0.25, -0.12]}
      >
        <div>
          <span className="text-purple-400">
            import
          </span>{" "}
          <span className="text-cyan-300">
            React
          </span>
        </div>
        <div className="text-slate-600">
          from "react"
        </div>
        <div className="mt-1 text-emerald-300">
          export default App
        </div>
      </FloatingCodePanel>

      <FloatingCodePanel
        position={[3.15, 1.35, -1]}
        rotation={[-0.1, -0.25, 0.12]}
      >
        <div className="text-sky-300">
          &lt;DigitalBuilder /&gt;
        </div>
        <div className="text-slate-500">
          performance="fast"
        </div>
        <div className="text-slate-500">
          experience="premium"
        </div>
      </FloatingCodePanel>

      <FloatingCodePanel
        position={[3.4, -1.3, -0.5]}
        rotation={[0.15, -0.18, -0.08]}
      >
        <div>
          <span className="text-purple-400">
            git
          </span>{" "}
          <span className="text-white">
            push
          </span>
        </div>
        <div className="text-emerald-300">
          ✓ deployed
        </div>
        <div className="text-slate-500">
          production / ready
        </div>
      </FloatingCodePanel>

    </Canvas>
  );
}


// ============================================================
// SECTION HEADING
// ============================================================

function SectionHeading({
  number,
  eyebrow,
  title,
  description,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-14 max-w-3xl">
      <div className="section-number mb-4">
        {number} / {eyebrow}
      </div>

      <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
        {title}
      </h2>

      <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">
        {description}
      </p>
    </div>
  );
}


// ============================================================
// ABOUT TILT CARD
// ============================================================

function AboutCard() {
  const [rotate, setRotate] = useState({
    x: 0,
    y: 0,
  });

  function handleMove(
    event: ReactMouseEvent<HTMLDivElement>
  ) {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      ((event.clientX - rect.left) / rect.width - 0.5) *
      12;

    const y =
      ((event.clientY - rect.top) / rect.height - 0.5) *
      -12;

    setRotate({
      x: y,
      y: x,
    });
  }

  function reset() {
    setRotate({
      x: 0,
      y: 0,
    });
  }

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{
        rotateX: rotate.x,
        rotateY: rotate.y,
      }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 18,
        mass: 0.7,
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
      className="glass relative min-h-[420px] overflow-hidden rounded-3xl p-7 sm:p-10"
    >
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />

      <div
        className="relative"
        style={{
          transform: "translateZ(30px)",
        }}
      >
        <div className="mb-8 flex items-center justify-between">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-sky-300/70">
            digital.builder
          </div>

          <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 text-[10px] uppercase tracking-widest text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            shipping
          </div>
        </div>

        <h3 className="max-w-xl text-2xl font-semibold text-white sm:text-3xl">
          I build software products and run a small technology company.
          <span className="text-gradient">
            {" "}Engineered to ship.
          </span>
        </h3>

        <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
          Full-stack developer with a focus on backend services, APIs,
          web frontends and the infrastructure that ties them together.
          I write code that other developers can read and maintain.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["01", "Build"],
            ["02", "Ship"],
            ["03", "Iterate"],
            ["04", "Maintain"],
          ].map(([number, label]) => (
            <div
              key={number}
              className="rounded-2xl border border-white/8 bg-white/[0.025] p-4"
            >
              <div className="font-mono text-[10px] text-sky-300/60">
                {number}
              </div>

              <div className="mt-2 text-sm font-medium text-white">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}


// ============================================================
// WORK CARD
// ============================================================

function WorkCard({
  item,
  index,
}: {
  item: (typeof workItems)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.65,
        delay: index * 0.1,
      }}
      whileHover={{
        y: -8,
      }}
      className="glass glass-hover group relative overflow-hidden rounded-3xl p-7"
    >
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-purple-500/5 blur-3xl transition-all duration-500 group-hover:bg-sky-500/10" />

      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-sky-300/60">
            {item.number}
          </span>

          <ArrowUpRight />
        </div>

        <h3 className="mt-12 text-xl font-semibold text-white">
          {item.title}
        </h3>

        <p className="mt-4 min-h-[100px] text-sm leading-6 text-slate-400">
          {item.description}
        </p>

        <div className="mt-7 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}


// ============================================================
// TECH ORBIT
// ============================================================

function TechOrbit() {
  const group = useRef<THREE.Group>(null);

  const positions = useMemo(() => {
    return technologies.map((_, index) => {
      const angle =
        (index / technologies.length) *
        Math.PI *
        2;

      const radius = 2.65;

      return [
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * 0.72,
        Math.sin(angle * 2) * 0.35,
      ] as [number, number, number];
    });
  }, []);

  useFrame((state) => {
    if (!group.current) return;

    group.current.rotation.z =
      state.clock.elapsedTime * 0.09;

    group.current.rotation.y =
      Math.sin(state.clock.elapsedTime * 0.25) *
      0.12;
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[0.85, 2]} />

        <meshStandardMaterial
          color="#10182b"
          metalness={0.8}
          roughness={0.2}
          emissive="#142c55"
          emissiveIntensity={1}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.05, 32, 32]} />

        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.04}
          wireframe
        />
      </mesh>

      {positions.map((position, index) => (
        <Float
          key={technologies[index]}
          speed={1.2}
          floatIntensity={0.25}
          rotationIntensity={0.15}
        >
          <group position={position}>
            <mesh>
              <sphereGeometry
                args={[0.13, 20, 20]}
              />

              <meshStandardMaterial
                color={
                  index % 2 === 0
                    ? "#38bdf8"
                    : "#8b5cf6"
                }
                emissive={
                  index % 2 === 0
                    ? "#38bdf8"
                    : "#8b5cf6"
                }
                emissiveIntensity={2.5}
              />
            </mesh>

            <Html
              center
              distanceFactor={7}
              position={[0, -0.34, 0]}
              style={{
                pointerEvents: "none",
                whiteSpace: "nowrap",
              }}
            >
              <div className="rounded-full border border-white/10 bg-[#050914]/90 px-2.5 py-1 font-mono text-[8px] text-slate-300 shadow-xl backdrop-blur-md">
                {technologies[index]}
              </div>
            </Html>
          </group>
        </Float>
      ))}
    </group>
  );
}

function TechScene() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 8],
        fov: 42,
      }}
      dpr={[1, 1.6]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <ambientLight intensity={0.5} />

      <pointLight
        position={[4, 3, 5]}
        intensity={8}
        color="#38bdf8"
      />

      <pointLight
        position={[-4, -2, 4]}
        intensity={6}
        color="#8b5cf6"
      />

      <Sparkles
        count={70}
        scale={[8, 7, 7]}
        size={1.3}
        speed={0.2}
        opacity={0.35}
      />

      <TechOrbit />
    </Canvas>
  );
}


// ============================================================
// NAVIGATION
// ============================================================

function Navigation() {
  const [open, setOpen] = useState(false);

  const links: Array<[string, string]> = [
    ["About", "#about"],
    ["Work", "#work"],
    ["Tech", "#tech"],
    ["Find Me", "#find-me"],
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav className="glass mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3">
        <a
          href="#hero"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-sky-300/20 bg-sky-300/5 font-mono text-xs text-sky-300">
            S
          </div>

          <div>
            <div className="text-sm font-semibold text-white">
              Sandeep
            </div>

            <div className="hidden font-mono text-[8px] uppercase tracking-[0.2em] text-slate-500 sm:block">
              digital builder
            </div>
          </div>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-xs font-medium text-slate-400 transition-colors hover:text-white"
            >
              {label}
            </a>
          ))}
        </div>

        <a
          href="#find-me"
          className="hidden rounded-full border border-sky-300/20 bg-sky-300/5 px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-sky-300 transition-all hover:bg-sky-300/10 md:block"
        >
          Let's connect
        </a>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((value) => !value)}
          className="rounded-xl border border-white/10 px-3 py-2 text-slate-300 md:hidden"
        >
          <span className="block h-px w-4 bg-current" />
          <span className="mt-1.5 block h-px w-4 bg-current" />
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{
            opacity: 0,
            y: -8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="glass mx-auto mt-2 max-w-6xl rounded-2xl p-3 md:hidden"
        >
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
            >
              {label}
            </a>
          ))}
        </motion.div>
      )}
    </header>
  );
}


// ============================================================
// HERO
// ============================================================

function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: 80,
    damping: 20,
  });

  const springY = useSpring(mouseY, {
    stiffness: 80,
    damping: 20,
  });

  const backgroundX = useTransform(
    springX,
    [-1, 1],
    [-18, 18]
  );

  const backgroundY = useTransform(
    springY,
    [-1, 1],
    [-18, 18]
  );

  function handleMouseMove(
    event: ReactMouseEvent<HTMLElement>
  ) {
    const x =
      event.clientX / window.innerWidth * 2 - 1;

    const y =
      event.clientY / window.innerHeight * 2 - 1;

    mouseX.set(x);
    mouseY.set(y);
  }

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24 sm:px-10"
    >
      <motion.div
        style={{
          x: backgroundX,
          y: backgroundY,
        }}
        className="hero-grid absolute inset-[-50px] opacity-70"
      />

      <div className="ambient-blue -left-48 top-20" />
      <div className="ambient-purple -right-48 bottom-0" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="max-w-2xl">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-400" />

            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-400">
              available for interesting problems
            </span>
          </motion.div>

          <motion.h1
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.1,
            }}
            className="text-5xl font-extrabold leading-[0.98] tracking-[-0.04em] text-white sm:text-7xl lg:text-[82px]"
          >
            Hi, I&apos;m Sandeep
            <span className="text-gradient">.</span>

            <br />

            <span className="text-slate-500">
              Software Developer
            </span>{" "}
            <span className="text-gradient">
              • Founder • Builder
            </span>
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.25,
            }}
            className="mt-7 max-w-xl text-base leading-7 text-slate-400 sm:text-lg"
          >
            I design and build modern digital products, interfaces and
            systems where engineering meets imagination. Founder of
            Americanbusinessdeveloper.
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.35,
            }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
            >
              Explore My Work

              <span className="transition-transform group-hover:translate-x-1">
                <ArrowUpRight />
              </span>
            </a>

            <a
              href="https://github.com/contact-tsandeep"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              GitHub
            </a>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 1,
              delay: 0.8,
            }}
            className="mt-12 flex items-center gap-5 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-600"
          >
            <span>JavaScript</span>
            <span>•</span>
            <span>TypeScript</span>
            <span>•</span>
            <span>Three.js</span>
          </motion.div>
        </div>

        <div className="relative hidden h-[620px] lg:block">
          <div className="absolute inset-0">
            <HeroScene />
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
            <div className="glass rounded-full px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500">
              move your cursor
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-slate-600">
          scroll
        </span>

        <div className="h-10 w-px bg-gradient-to-b from-sky-400/50 to-transparent" />
      </div>
    </section>
  );
}


// ============================================================
// ABOUT
// ============================================================

function About() {
  return (
    <section
      id="about"
      className="relative px-6 py-32 sm:px-10"
    >
      <div className="ambient-blue right-[-300px] top-1/3 opacity-50" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          number="01"
          eyebrow="ABOUT"
          title="Built with curiosity. Shipped with intent."
          description="A little context behind the person building behind the interface."
        />

        <AboutCard />
      </div>
    </section>
  );
}


// ============================================================
// WORK
// ============================================================

function Work() {
  return (
    <section
      id="work"
      className="relative px-6 py-32 sm:px-10"
    >
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          number="02"
          eyebrow="WORK"
          title="Things worth building."
          description="A collection of directions I care about — from running a tech company to shipping open-source and clean engineering."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {workItems.map((item, index) => (
            <WorkCard
              key={item.title}
              item={item}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


// ============================================================
// TECH
// ============================================================

function Tech() {
  return (
    <section
      id="tech"
      className="relative overflow-hidden px-6 py-32 sm:px-10"
    >
      <div className="ambient-purple -left-48 top-1/3 opacity-60" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          number="03"
          eyebrow="TECH"
          title="My stack is a system."
          description="Tools are only useful when they disappear into the experience. These are the technologies I like putting together."
        />

        <div className="glass relative h-[520px] overflow-hidden rounded-3xl">
          <div className="hero-grid absolute inset-0 opacity-40" />

          <div className="absolute inset-0">
            <TechScene />
          </div>

          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-sky-300/60">
              core
            </div>

            <div className="mt-2 text-xl font-semibold text-white">
              Sandeep&apos;s Stack
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[8px] uppercase tracking-[0.25em] text-slate-600">
            engineering × design × shipping
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================================
// FIND ME
// ============================================================

function FindMe() {
  const links = [
    {
      label: "GitHub",
      description:
        "Code, experiments and open-source work.",
      href: "https://github.com/contact-tsandeep",
      icon: <GithubIcon />,
    },
    {
      label: "Company",
      description:
        "Americanbusinessdeveloper — software, tools & services for businesses.",
      href: "https://americanbusinessdeveloper.eu.org",
      icon: <ExternalIcon />,
    },
    {
      label: "GitHub Pages",
      description:
        "The home of this portfolio on the web.",
      href: "https://contact-tsandeep.github.io",
      icon: <ExternalIcon />,
    },
  ];

  return (
    <section
      id="find-me"
      className="relative px-6 pb-16 pt-32 sm:px-10"
    >
      <div className="ambient-blue bottom-[-250px] left-1/2 -translate-x-1/2 opacity-60" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          number="04"
          eyebrow="FIND ME"
          title="Let's build something."
          description="The best projects usually start with a simple conversation."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {links.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.1,
              }}
              whileHover={{
                y: -6,
              }}
              className="glass glass-hover group rounded-3xl p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-sky-300">
                  {link.icon}
                </div>

                <div className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
                  <ArrowUpRight />
                </div>
              </div>

              <h3 className="mt-8 text-lg font-semibold text-white">
                {link.label}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {link.description}
              </p>
            </motion.a>
          ))}
        </div>

        <footer className="mt-28 flex flex-col justify-between gap-5 border-t border-white/8 pt-6 text-xs text-slate-600 sm:flex-row sm:items-center">
          <div className="font-mono">
            © {new Date().getFullYear()} Sandeep.
          </div>

          <div className="font-mono uppercase tracking-[0.15em]">
            Designed & built with curiosity.
          </div>
        </footer>
      </div>
    </section>
  );
}


// ============================================================
// APP
// ============================================================

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");

    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-space-950 text-white">
      <Navigation />

      <Hero />

      <About />

      <Work />

      <Tech />

      <FindMe />
    </main>
  );
}
