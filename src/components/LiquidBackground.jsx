import { memo } from "react";

/**
 * LiquidBackground — very subtle slow-moving water feel.
 * Pure CSS (no WebGL cost): two blurred gradient blobs drift on
 * 18-26s loops + a faint grain overlay. Stays behind content,
 * never hurts readability. Disabled animation under reduced-motion.
 */
const LiquidBackground = memo(() => {
    return (
        <div className="liquid-bg" aria-hidden="true">
            <div className="liquid-bg__blob liquid-bg__blob--a" />
            <div className="liquid-bg__blob liquid-bg__blob--b" />
            <div className="liquid-bg__blob liquid-bg__blob--c" />
            <div className="liquid-bg__grain" />
            <div className="liquid-bg__vignette" />
        </div>
    );
});

export default LiquidBackground;
