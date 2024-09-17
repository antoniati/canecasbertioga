"use client";

import { useEffect, useRef } from "react";

interface VideoProps {
    path: string;
    alt: string;
    transformation?: Array<{ height: number, width: number, b?: string, q?: number }>;
    controls?: boolean;
    autoplay?: boolean;
    loop?: boolean;
}

export const Video = ({
    path,
    alt,
    transformation,
    controls = true,
    autoplay = false,
    loop = false,
}: VideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current && autoplay) {
            videoRef.current.play();
        }
    }, [autoplay]);

    return (
        <video
            className='w-full h-full object-cover'
            ref={videoRef}
            width={transformation?.[0]?.width}
            height={transformation?.[0]?.height}
            controls={controls}
            autoPlay={autoplay}
            loop={loop}
            muted
        >
            <source src={`https://ik.imagekit.io/rgkyjaasc/${path}`} type="video/mp4" />
            {alt}
        </video>
    );
};