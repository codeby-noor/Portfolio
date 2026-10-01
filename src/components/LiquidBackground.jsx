import { memo } from "react";

/**
 * QuietBackdrop — faint editorial column grid + film grain.
 * No color blobs, no glow. Fluidity is expressed through
 * motion (Lenis, reveals, parallax), not decoration.
 */
const LiquidBackground = memo(() => {
    return (
        <div className="liquid-bg" aria-hidden="true">
            <div className="editorial-grid" />
            <div className="liquid-bg__grain" />
            <div className="liquid-bg__vignette" />
        </div>
    );
});

export default LiquidBackground;
