import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {recieveFeeds} from '../../DB/DB'
import {useEffect, useState} from "react";


const columns = [
    {
        field: 'id'
        , headerName: 'id',
        width: 100
    },
    {
        field: 'Name',
        headerName: 'Name',
        description: 'Name Feeds',
        width: 160,
        editable: false,
        type: 'string'
    },
    {
        field: 'IsActive',
        headerName: 'Active',
        description: 'Active?',
        sortable: true,
        width: 160,
        editable: false,
        type: 'boolean'
    },
    {
        field: 'RSSs',
        headerName: 'RSSs',
        description: 'RSSs',
        width: 160,
        editable: false,
        type: 'array'
    },
    {
        field: 'Tags',
        headerName: 'Tags',
        description: 'Tags',
        width: 160,
        editable: false,
        type: 'Array'
    },
    {
        field: 'URL',
        width: 160,
        editable: false,
        type: 'string'
    },
]



const Grid = () => {
    const [rows, setRows] = useState([]);

    useEffect(()=>{
        recieveFeeds().then(result => {

            for (let s = 0; result.length > s; s++) {

                result[s].id = s;
                result[s].Tags = result[s].Tags.length > 0 ? result[s].Tags : "[ No Tags]";
                result[s].RSSs = result[s].RSSs.length > 0 ? result[s].RSSs : "[ No RSS]";
            }

            console.log(result);
            setRows(result);
        });

    },[])



    return (
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[6]}
            autoHeight
            disableSelectionOnClick
        />
    )

};

export default function Feeds() {
    return (
        <div style={{height: 400, width: '100%'}}>
            <Grid></Grid>
        </div>
    );
}
