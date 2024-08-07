'use client';

import { useState } from "react";

/**
 * Transcription line type
 */
type Lines = {[line: string]: {
    text: string;
    start: number;
    end: number;
    speaker: string;
}};

/**
 * Transcription component props
 */
interface Props {
    lines: Lines;
}

/**
 * A component that renders the transcriptions
 */
export default function Transcription(props: Props) {

    const [current, setCurrent] = useState<number>(1);

    return (
        <div className="relative w-full">
            <div className="bg-gradient-to-b from-transparent to-neutral-100 dark:to-neutral-900 absolute inset-0 z-10 pointer-events-none"/>
            
            <p className="text-lg leading-relaxed whitespace-pre-wrap">
                {Object.entries(props.lines).map(([line, val]) => (
                    <span
                        key={line}
                        className={`transition-opacity duration-200 ${current === parseInt(line) ? "opacity-100" : current < parseInt(line) ? "opacity-25" : "opacity-50"}`}
                        onClick={() => setCurrent(parseInt(line))}
                    >
                        {val.text} </span>
                ))}
            </p>
        </div>
    )
}
