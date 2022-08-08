import {AppBar, Box, Link, Toolbar, Typography} from "@mui/material";
import {SearchBar} from "./SearchBar";
import {TopBarProps} from "../lib/app.types";

function TopBar(props: TopBarProps) {
    return (
        <Box sx={{flexGrow: 1}} className={'topbar-box'}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        <Link href="/infinite-scroll" underline="none" color={"white"}>
                            Infinite Scroll
                        </Link>
                    </Typography>
                    <SearchBar {...props.searchProps}/>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export {TopBar};
