import ReactGA from "react-ga";

export const initGA = () => {
  ReactGA.initialize("YOUR_GOOGLE_ANALYTICS_TRACKING_ID");
};

export const logPageView = () => {
  ReactGA.pageview(window.location.pathname + window.location.search);
};