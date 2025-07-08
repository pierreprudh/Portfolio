import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback, useState, useEffect } from "react";

export const StarBackground = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      const htmlClassList = document.documentElement.classList;
      const darkMode = htmlClassList.contains("dark");
      setIsDark(darkMode);
    };

    // Initial check
    updateTheme();

    const observer = new MutationObserver(() => {
      updateTheme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const htmlClassList = document.documentElement.classList;
    const darkMode = htmlClassList.contains("dark");
    if (darkMode !== isDark) {
      setIsDark(darkMode);
    }
  });

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
    console.log("tsparticles loaded");
  }, []);

  console.log("StarBackground render – isDark:", isDark);
  return (
    <>
      {!isDark && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#ffffff',
            zIndex: 0,
          }}
        />
      )}
      {isDark && (
        <Particles
          id="tsparticles"
          init={particlesInit}
          style={{
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 0,
          }}
          options={{
            background: {
              color: {
                value: "#000000",
              },
            },
            fpsLimit: 60,
            particles: {
              number: {
                value: 80,
                density: {
                  enable: true,
                  area: 800,
                },
              },
              color: {
                value: "#ffffff",
              },
              shape: {
                type: "circle",
              },
              opacity: {
                value: 0.5,
              },
              size: {
                value: 3,
                random: true,
              },
              move: {
                enable: true,
                speed: 1,
                direction: "none",
                outModes: {
                  default: "out",
                },
              },
              links: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1,
              },
            },
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                onClick: {
                  enable: true,
                  mode: "push",
                },
                resize: true,
              },
              modes: {
                repulse: {
                  distance: 100,
                  duration: 0.4,
                },
                push: {
                  quantity: 4,
                },
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </>
  );
};
