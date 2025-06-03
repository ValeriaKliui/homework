import React, { useState, useEffect } from "react";

// Webpack or Vite will handle this import
// @ts-ignore
import Worker from "./workers.ts?worker";

export default function Dashboard() {
    const [result, setResult] = useState<number | null>(null);

    useEffect(() => {
        const worker = new Worker();

        worker.onmessage = (event: MessageEvent<number>) => {
            setResult(event.data);
            worker.terminate();
        };

        worker.postMessage(null); // Start the computation

        return () => worker.terminate();
    }, []);

    return <div>{result !== null ? result : "Calculating..."}</div>;
}



// REASON

// The high Total Blocking Time (TBT) in your Lighthouse report (600 ms) is caused by this line in your React component:

// tsx
// Copy
// Edit
// for(let i=0; i<1e8; i++){ t += i; }
// 🔍 Why it happens:
// This CPU-intensive synchronous loop runs on the main thread during the initial render (inside useEffect with an empty dependency array). It blocks the browser's ability to:

// respond to user input

// paint updates

// run other JS tasks

// Any script that blocks the main thread for >50 ms contributes to TBT. In your case, the loop takes enough time to push TBT up to 600 ms.




// | Metric                             | Target (Ideal)     | Notes                                                                |
// | ---------------------------------- | ------------------ | -------------------------------------------------------------------- |
// | **Total Blocking Time (TBT)**      | < 200 ms           | Should significantly drop after moving compute work off main thread. |
// | **First Contentful Paint (FCP)**   | < 1.8 s            | Measures when first content is painted.                              |
// | **Largest Contentful Paint (LCP)** | < 2.5 s            | Measures perceived load speed (main content render).                 |
// | **Time to Interactive (TTI)**      | < 3.8 s            | Should improve as JS execution blocks are minimized.                 |
// | **Speed Index**                    | < 4.3 s            | Measures visual progress of the page loading.                        |
// | **Main Thread Work**               | < 2 s              | Can be viewed under “Diagnostics” section.                           |
// | **JavaScript Execution Time**      | As low as possible | Lighter JS = faster interactivity.                                   |



// ✅ Commit Message
// vbnet
// Copy
// Edit
// refactor: offload heavy computation to Web Worker to reduce Total Blocking Time
// 📝 Pull Request Description
// What was fixed:

// This PR moves a CPU - intensive loop(originally inside a useEffect in Dashboard.tsx) into a Web Worker to eliminate UI thread blocking.

// Why this matters:

// Previously, the main thread was blocked for several hundred milliseconds during page load, as shown by a high Total Blocking Time(TBT) in the Lighthouse report(600 ms).

// This caused degraded responsiveness and slower Time to Interactive(TTI).

// What was done:

// Introduced a Web Worker(worker.ts) to perform the heavy calculation.

// Modified Dashboard.tsx to offload computation to the worker and respond via postMessage.

// Ensured UI remains responsive by avoiding long tasks on the main thread.