import {useEffect, useState} from "react";
import {debounce} from "@material-ui/core";

function useScroll() {
    const [scrollTop, setScrollTop] = useState(0);
    const [scrollHeight, setScrollHeight] = useState(document.documentElement.scrollHeight);


    useEffect(() => {
        const onScroll = () => {
            const st = document.documentElement.scrollTop;
            const sh = document.documentElement.scrollHeight;
            setScrollTop(st);
            setScrollHeight(sh);
        };

        const debounced = debounce(onScroll, 400)
        document.addEventListener("scroll", debounced);

        return () => document.removeEventListener("scroll", debounced);
    }, [scrollTop]);

    return {scrollTop, scrollHeight};
}

export {useScroll};
