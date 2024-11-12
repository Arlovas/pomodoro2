'use client'

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useEffect, useRef, useState } from "react";
import { formatTimeMinutes } from "./time/timeFormat";
import { GeistMono } from 'geist/font/mono';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/outline'

import Button from "./components/Button";
import NavBar from "./components/NavBar";

const POMODORO_BREAK_TIME = 5 * 60; // 5 min 
const DEFAULT_POMODORO_TIME = 25 * 60; // 25 min

export default function Pomodoro() {
    const [isActive, setIsActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(DEFAULT_POMODORO_TIME);

    const startTimeRef = useRef(Date.now());
    const intervalRef = useRef({});

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

                // Play the sound when the timer ends
                audioRef.current?.play();
            }
        }, 1000);

        return () => clearInterval(intervalRef.current as number);
    }, [isActive]);

    useEffect(() => {
        document.title = `${getTimeForScreen()} - Pomodovas`;
    }, [timeLeft])

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(DEFAULT_POMODORO_TIME);

        audioRef.current && (audioRef.current.currentTime = 0);
        audioRef.current?.pause();
    };

    const setBreakTime = () => {
        setIsActive(false);
        setTimeLeft(POMODORO_BREAK_TIME);

        audioRef.current && (audioRef.current.currentTime = 0);
        audioRef.current?.pause();
    }

    // Clear the interval, avoids unnecessary renders
    useEffect(() => {
        if (timeLeft <= 0) {
            clearInterval(intervalRef.current as number);
        }
    }, [timeLeft])

    const t = useTranslations('pomodoro');

    return (
        <>
            <NavBar />
            <main className="flex items-start justify-center pt-32">
                <div className={`bg-pomodoroBgColor/10 rounded-2xl p-10  ${GeistMono.className} antialiased`}>
                    <div>
                        <p className={`text-9xl text-mainText`}>
                            {getTimeForScreen()}
                        </p>

                        <div className="flex gap-4 justify-center mt-6">

                            <Button
                                onClick={start}
                                label={isActive ? t('pause') : t('start')}
                                icon={isActive ? <PauseIcon className="h-6 w-6" /> : <PlayIcon className="h-6 w-6" />}
                            />
                            <Button onClick={resetTimer} label={t('reset')} />
                            <Button onClick={setBreakTime} label={t('break')} />
                        </div>
                    </div>
                </div>
                <audio ref={audioRef} src="./finishSound.mp3" />
            </main>
        </>
    );
}
