import { useEffect, useState } from "react";

export const useCountdown = (initialSeconds: number) => {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isCountdownActive, setIsCountdownActive] = useState(false);
    let countdownTimer: NodeJS.Timeout | null = null;

    const startCountdown = (seconds: number) => {
        if (countdownTimer) {
            clearInterval(countdownTimer);
        }
        setSeconds(seconds);
        setIsCountdownActive(true);
        countdownTimer = setInterval(() => {
            setSeconds((prevSeconds) => {
                const newSeconds = prevSeconds - 1;
                if (newSeconds <= 0) {
                    setIsCountdownActive(false);
                    if (countdownTimer) {
                        clearInterval(countdownTimer);
                        countdownTimer = null;
                    }
                }
                return newSeconds;
            });
        }, 1000);
    };

    const resetCountdown = () => {
        if (countdownTimer) {
            clearInterval(countdownTimer);
            countdownTimer = null;
        }
        setSeconds(0);
        setIsCountdownActive(false);
    };

    useEffect(() => {
        return () => {
            if (countdownTimer) {
                clearInterval(countdownTimer);
            }
        };
    }, []);

    return { seconds, isCountdownActive, startCountdown, resetCountdown };
};