import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#7BD1B8",
      dark: "#3E6C61",
      light: "#ccfaee",
      contrastText: "#fff",
    },
    secondary: {
      main: "#6583a8",
      contrastText: "#fff",
    },
    neutral: {
      main: "#5E6668",
      light: "#F6FAFB",
      dark: "#252B31",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 768,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    allVariants: {
      color: "#15192b",
    },
  },
});

theme = responsiveFontSizes(theme);

theme.typography.body2 = {
  [theme.breakpoints.down("md")]: {
    fontSize: "0.8rem",
  },
};

theme.typography.subtitle2 = {
  [theme.breakpoints.down("md")]: {
    fontSize: "0.7rem",
  },
};

theme.typography.subtitle1 = {
  [theme.breakpoints.down("md")]: {
    fontSize: "0.8rem",
  },
};
theme.typography.h6 = {
  [theme.breakpoints.down("md")]: {
    fontSize: "1.2rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
};
theme.typography.h4 = {
  [theme.breakpoints.down("md")]: {
    fontSize: "1.4rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
  },
};
theme.typography.h1 = {
  [theme.breakpoints.down("md")]: {
    fontSize: "2.2rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.8rem",
  },
};

theme = createTheme(theme, {
  palette: {
    primary: {
      main: theme.palette.primary.main,
    },
    secondary: {
      main: theme.palette.secondary.main,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minWidth: "40px",
          color: theme.palette.neutral.light,
          [theme.breakpoints.down("md")]: {
            fontSize: "0.7rem",
          },
        },
        startIcon: {
          margin: "0",
          color: theme.palette.primary.main,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#FCFCFC",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          [theme.breakpoints.down("md")]: {
            minHeight: "35px",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.neutral.light,
          [theme.breakpoints.down("md")]: {
            fontSize: "0.8rem",
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          [theme.breakpoints.down("md")]: {
            fontSize: "1.2rem",
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: "red",
        },
      },
    },
  },
});

export default theme;
