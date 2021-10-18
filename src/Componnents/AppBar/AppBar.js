import {AppBar, Box, Button, Drawer, IconButton, List, ListItemButton, ListItemIcon, Toolbar} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import SyncIcon from '@mui/icons-material/Sync';
import {useState} from "react";
import {DataUsageTwoTone} from "@mui/icons-material";


function AppBarComponnent() {

    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <div>
            <Drawer onClick={()=>{setDrawerOpen(!drawerOpen)}} open={drawerOpen} id="Drawer" anchor="left">
                <Box sx={{width: 200}}>
                    <List>
                        <ListItemButton sx={{width: '100%', height: 40}}>
                            <ListItemIcon>
                                <RssFeedIcon/>
                            </ListItemIcon>
                            <span> Feeder </span>
                        </ListItemButton>

                        <ListItemButton sx={{width: '100%', height: 40}}>
                            <ListItemIcon>
                                <SyncIcon/>
                            </ListItemIcon>
                            <span> Syncer </span>
                        </ListItemButton>

                        <ListItemButton sx={{width: '100%', height: 40}}>
                            <ListItemIcon>
                                <DataUsageTwoTone/>
                            </ListItemIcon>
                            <span> Data </span>
                        </ListItemButton>


                    </List>
                    <Button sx={{width: 'unset'}}>

                    </Button>

                </Box>

            </Drawer>
            <AppBar position="relative">


                <Toolbar variant="dense">
                    <IconButton onClick={()=>{setDrawerOpen(!drawerOpen)}} >
                        <MenuIcon style={{color:'white'}} />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>

    );
}


export default AppBarComponnent;





