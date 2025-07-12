import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import * as Sentry from "@sentry/react";

// Sentry.init({
//     dsn: `${import.meta.env.VITE_APP_SENTRY_DSN}`,
//     integrations: [
//         new Sentry.BrowserTracing({
//             tracePropagationTargets: [
//                 `${import.meta.env.VITE_APP_URL}`,
//             ],
//         }),
//         new Sentry.Replay({
//             maskAllText: false,
//             blockAllMedia: false,
//         }),
//     ],
//     tracesSampleRate: 1.0,
//     replaysSessionSampleRate: 0.1,
//     replaysOnErrorSampleRate: 1.0,
// });

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
