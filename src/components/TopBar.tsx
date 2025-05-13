import {SearchBar} from "./SearchBar";
import {TopBarProps} from "../lib/app.types";

function TopBar(props: TopBarProps) {
    return (
        <header className="topbar">
            <nav className="topbar-nav">
                <div className="topbar-title">
                    <a href="/infinite-scroll" className="topbar-link">
                        Infinite Scroll
                    </a>
                </div>
                <SearchBar {...props.searchProps}/>
            </nav>
        </header>
    );
}

export {TopBar};
