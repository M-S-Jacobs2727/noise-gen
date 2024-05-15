import { useEffect } from "react";

export function useHotkeys(key: string, callback: () => void) {
    useEffect(() => {
        if (typeof document === "undefined")
            return;

        document.addEventListener("keydown", (e) => {
            if (e.key === key) {
                console.log(`key pressed: '${e.key}'`);
                callback();
            }
        });

        console.log(`Created event listener for '${key}'`);

        return () => {
            document.removeEventListener("keydown", (e) => {
                if (e.key === key) {
                    console.log(`key pressed: '${e.key}'`);
                    callback();
                }
            });
            console.log(`Removed event listener for '${key}'`);
        };
    }, [key, callback]);
}