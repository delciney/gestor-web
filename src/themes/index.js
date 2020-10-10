import defaultTheme from "./default";

import { createMuiTheme } from "@material-ui/core";

const overrides = {
  typography: {
    h1: {
        fontFamily: "Ubuntu",
        fontSize: "3rem",
    },
    h2: {
        fontFamily: "Ubuntu",
        fontSize: "2rem",
    },
    h3: {
        fontFamily: "Ubuntu",
        fontSize: "1.64rem",
    },
    h4: {
        fontFamily: "Ubuntu",
        fontSize: "1.5rem",
    },
    h5: {
        fontFamily: "Ubuntu",
        fontSize: "1.285rem",
    },
    h6: {
        fontFamily: "Ubuntu",
        fontSize: "1.142rem",
    },
  },
};

export default {
  default: createMuiTheme({ ...defaultTheme, ...overrides }),
};
