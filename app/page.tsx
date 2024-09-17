'use client'

import { useEffect, useRef, useState } from "react";
import { formatTimeMinutes } from "./time/timeFormat";

const DEFAULT_POMODORO_TIME = 25 * 60;

export default function Pomodoro() {
    const [isActive, setIsActive] = useState(false);
    const startTimeRef = useRef(Date.now());
    const intervalRef = useRef({});
    const [timeLeft, setTimeLeft] = useState(DEFAULT_POMODORO_TIME);
    const audioRef = useRef<HTMLAudioElement>(null);

    function start() {
        setIsActive(!isActive);
    }

    function getTimeForScreen(): string {
        if (timeLeft === null) {
            return 'n_n';
        }

        if (isActive || timeLeft > 0) {
            return formatTimeMinutes(timeLeft);
        }

        return '00:00';
    }


    // Makes the pomodoro work 
    useEffect(() => {
        // Avoid early starts
        if (!isActive) return;

        // Only way to correct keep track of the time, is to keep start point and compare
        startTimeRef.current = Date.now();
        
        intervalRef.current = setInterval(() => {
            const elapsedTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
            
            setTimeLeft(Math.max(timeLeft - elapsedTime, 0));

            if (timeLeft - elapsedTime <= 0) {
                setTimeLeft(0);
                audioRef.current?.play(); // Play the sound when the timer ends
            }
        }, 1000);

        return () => clearInterval(intervalRef.current as number);
    }, [isActive]);

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(DEFAULT_POMODORO_TIME);

        audioRef.current && (audioRef.current.currentTime = 0);
        audioRef.current?.pause();
    };

    // Clear the interval, avoids unnecessary renders
    useEffect(() => {
        if (timeLeft <= 0) {
            clearInterval(intervalRef.current as number);
        }
    }, [timeLeft])

    return (
        <main className="h-screen flex items-start justify-center mt-32">
            <div className="bg-blue-100 rounded-2xl p-10 bg-opacity-10">
                <div>
                    <p className={`text-9xl text-orange-700`}>
                        {getTimeForScreen()}
                    </p>

                    <div className="flex gap-4 justify-center mt-6">
                        <button className="cursor-pointer p-2 rounded-xl text-2xl hover:bg-orange-400 hover:bg-opacity-20" onClick={start}>
                            start
                        </button>
                        <div>
                            .
                        </div>
                        <button className="cursor-pointer p-2 rounded-xl text-2xl hover:bg-orange-400 hover:bg-opacity-20" onClick={resetTimer}>
                            reset
                        </button>
                    </div>
                </div>
            </div>
            <audio ref={audioRef} src="./finishSound.mp3" />
        </main>
    );
}
