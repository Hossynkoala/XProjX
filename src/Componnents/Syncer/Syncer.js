import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {RecieveRSSs} from '../../DB/DB'
import {useEffect, useState} from "react";
import {Button, ButtonGroup, Stack} from "@mui/material";


const columns = [
    {
        field: 'id'
        , headerName: 'id',
        width: 90
    },
    {
        field: 'URL',
        headerName: 'URL',
        description: 'Base URL',
        width: 260,
        editable: false,
        type: 'string'
    },
    {
        field: 'RSSs',
        headerName: 'RSSs',
        description: 'RSSs Path',
        width: 260,
        editable: false,
        type: 'string',
    },

    {
        field: 'Path',
        headerName: 'Path',
        description: 'Path',
        width: 350,
        editable: false,
        type: 'string',
        valueGetter: (params) =>
            `${params.getValue(params.id, 'URL') || ''}/${params.getValue(params.id, 'RSSs') || ''}`,
    },
]


function Grid() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        RecieveRSSs().then(result => {

            for (let rs = 0; result.length > rs; rs++) {
                result[rs].id = rs;
            }
            console.log("hi");
            setRows(result);
        });

    }, [])

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[6]}
            autoHeight
            disableSelectionOnClick
            checkboxSelection
        />
    )

};


function ItemHeader(Name) {
    return (

        <Button style={{
            color: 'white',
            borderRadius: '10%',
            background: '#1976d2',
            height: "auto",
            margin: 10,
            padding: 10
        }}>
            {Name.Name != undefined ? Name.Name : "Not Set"}
        </Button>
    );

}


export default function Syncer() {
    return (
        <div style={{height: 400, width: '100%'}}>
            <Stack spacing={3} direction={'row'}>
                <ButtonGroup variant="contained"  aria-label="split button">
                </ButtonGroup>
            </Stack>


            <Grid></Grid>
        </div>
    );
}
