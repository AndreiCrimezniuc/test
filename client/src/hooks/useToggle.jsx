import { useState, useCallback } from "react";

export default function useToggle(init = false) {
    const [state, setState] = useState(init);

    const toggle = useCallback(() => {
        setState((prevState) => !prevState);
    }, []);

    return [state, toggle];
};