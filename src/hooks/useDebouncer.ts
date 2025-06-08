import { useEffect, useState } from "react";

export const useDebounce = <T>(input: T, delay: number): T => {
    const [debounceInput, setDebounceInput] = useState(input);

    useEffect(() => {

        const timer = setTimeout(() => {
            setDebounceInput(input);
        }, delay);

        return () => clearTimeout(timer);
    }, [input]);

    return debounceInput;
};
