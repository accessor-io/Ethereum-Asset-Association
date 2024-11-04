import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "'M PLUS Rounded 1c', sans-serif",
    body: "'M PLUS Rounded 1c', sans-serif",
  },
  colors: {
    brand: {
      50: "#E3F2FD",
      100: "#BBDEFB",
      200: "#90CAF9",
      300: "#64B5F6",
      400: "#42A5F5",
      500: "#2196F3",
      600: "#1E88E5",
      700: "#1976D2",
      800: "#1565C0",
      900: "#0D47A1",
    },
    accent: {
      50: "#FFF3E0",
      100: "#FFE0B2",
      200: "#FFCC80",
      300: "#FFB74D",
      400: "#FFA726",
      500: "#FF9800",
      600: "#FB8C00",
      700: "#F57C00",
      800: "#EF6C00",
      900: "#E65100",
    },
    background: {
      light: "#F5F7FA",
      dark: "#1A202C",
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "500",
        borderRadius: "md",
      },
      variants: {
        solid: (props) => ({
          bg: props.colorScheme === "brand" ? "brand.500" : undefined,
          color: "white",
          _hover: {
            bg: props.colorScheme === "brand" ? "brand.600" : undefined,
            transform: "translateY(-2px)",
            boxShadow: "md",
          },
          transition: "all 0.2s",
        }),
        ghost: {
          _hover: {
            bg: "brand.50",
          },
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: "md",
          _focus: {
            boxShadow: "0 0 0 2px var(--chakra-colors-brand-200)",
            borderColor: "brand.300",
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: "700",
        letterSpacing: "tight",
      },
    },
    Box: {
      baseStyle: {
        outline: "1px solid",
        outlineColor: "green.500",
        animation: "colorShift 15s infinite",
        transition: "background-color 0.5s ease, outline-color 0.5s ease",
      }
    }
  },
  styles: {
    global: {
      "@keyframes colorShift": {
        "0%": {
          backgroundColor: "rgba(240, 248, 255, 0.8)", // Light blue start
          outlineColor: "rgba(0, 128, 0, 0.5)", // Green start
        },
        "25%": {
          backgroundColor: "rgba(230, 230, 250, 0.8)", // Lavender mist
          outlineColor: "rgba(0, 100, 0, 0.6)", // Darker green
        },
        "50%": {
          backgroundColor: "rgba(165, 42, 42, 0.1)", // Brownish tint
          outlineColor: "rgba(0, 128, 128, 0.7)", // Teal
        },
        "75%": {
          backgroundColor: "rgba(255, 228, 196, 0.2)", // Bisque
          outlineColor: "rgba(0, 0, 128, 0.5)", // Navy
        },
        "100%": {
          backgroundColor: "rgba(240, 248, 255, 0.8)", // Back to light blue
          outlineColor: "rgba(0, 128, 0, 0.5)", // Back to green
        }
      },
      "body": {
        animation: "colorShift 15s infinite",
        transition: "background-color 0.5s ease, outline-color 0.5s ease",
      }
    }
  },
});

export default theme;
