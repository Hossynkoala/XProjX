import './App.css';
import {Grid,} from "@mui/material";
//import Feeds from "./Componnents/Feeds/Feeds";
import Syncer from "./Componnents/Syncer/Syncer";
import AppBar from "./Componnents/AppBar/AppBar"


function App() {
    return (
        <Grid>
            <Grid item>
                <AppBar/>
            </Grid>
            <Grid>
                <Syncer/>
            </Grid>

        </Grid>


    );
}


export default App;




