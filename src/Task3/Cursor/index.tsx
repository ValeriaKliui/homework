import React, { useState, useEffect } from 'react';

export default function Dashboard() {
    const [d, setD] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Create a new worker instance
        const worker = new Worker(new URL('./worker.ts', import.meta.url));

        // Handle the worker's response
        worker.onmessage = (event) => {
            setD(event.data);
            worker.terminate(); // Clean up the worker when done
        };

        // Handle any errors
        worker.onerror = (error) => {
            setError('Worker error: ' + error.message);
            worker.terminate();
        };

        // Start the computation
        worker.postMessage(null);

        // Cleanup function
        return () => {
            worker.terminate();
        };
    }, []);

    if (error) return <div>Error: {error}</div>;
    return <div>{d !== null ? d : 'Computing...'}</div>;
}

// --LIGHTHOUSE ANALYTICS
// The problem is that you have a computationally intensive loop running directly on the main thread during component initialization. The for loop that iterates 100 million times (1e8) is blocking the main thread, which:
// Prevents the browser from responding to user input
// Blocks rendering and other important browser tasks
// Directly contributes to the high Total Blocking Time metric
// Total Blocking Time (TBT) measures the total amount of time when the main thread was blocked for long enough to prevent input responsiveness. Any task that takes longer than 50ms is considered a "long task" and contributes to TBT.



// METRIX CHECK-LIST::
// Lighthouse Performance Metrics
// [ ] Total Blocking Time (TBT) should be significantly reduced from 600ms
// [ ] First Contentful Paint (FCP) should remain stable or improve from 1.2s
// [ ] Largest Contentful Paint (LCP) should remain stable or improve from 1.8s
// [ ] Time to Interactive (TTI) should improve from 2.1s
// Runtime Behavior
// [ ] UI should remain responsive during computation
// [ ] Loading indicator ("Computing...") should be visible while calculation runs
// [ ] No browser warnings about "unresponsive script" or "page unresponsive"
// DevTools Performance Panel
// [ ] Check Main thread activity - should show minimal blocking
// [ ] Verify the computation is running in a separate Worker thread
// [ ] No long tasks (>50ms) on the main thread



// ----COMMIT INFO
// fix(performance): Optimize heavy computation using Web Worker

// - Move intensive loop calculation to a dedicated Web Worker
// - Prevent main thread blocking (reduces TBT from 600ms)
// - Add loading state and error handling
// - Implement proper worker cleanup on unmount

// Before: Heavy computation blocked main thread causing poor UX and high TBT (600ms)
// After: Computation runs in separate thread, UI remains responsive

// Technical Details:
// - Created worker.ts to handle the computation off-main thread
// - Updated Dashboard component to manage Worker lifecycle
// - Added proper error boundaries and loading states
// - Implemented cleanup to prevent memory leaks

// Testing:
// - Verify Lighthouse metrics improvement (especially TBT)
// - Check DevTools Performance panel for main thread activity
// - Confirm UI responsiveness during computation
// - Validate loading indicator appears during calculation

// Closes #[ticket-number]