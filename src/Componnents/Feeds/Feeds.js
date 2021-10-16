import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {recieveFeeds} from '../../DB/DB'
import {Component, createElement, useEffect, useState} from "react";
import {Button, Stack} from "@mui/material";
import AddFeeds from "./moduleAddFeed/moduleAddFeeds";
import ReactDOM, {createPortal} from "react-dom";

const node = document.getElementById('modal-root');
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

export default function Feeds() {

    const [isOpen, setIsOpen] = useState(false);

    const openmodule = () => {
        setIsOpen(!isOpen);
    }


    const [rows, setRows] = useState([]);

    useEffect(() => {
        recieveFeeds().then(result => {

            for (let s = 0; result.length > s; s++) {

                result[s].id = s;
                result[s].Tags = result[s].Tags.length > 0 ? result[s].Tags : "[ No Tags]";
                result[s].RSSs = result[s].RSSs.length > 0 ? result[s].RSSs : "[ No RSS]";
            }

            setRows(result);
        });

    }, [])


    return (

        <div style={{height: 400, width: '100%'}}>

            <AddFeeds close={openmodule} isOpen={isOpen}></AddFeeds>

            <Stack spacing={3} direction={'row'}>
                <Button
                    onClick={openmodule}
                    style={{
                        color: 'white',
                        borderRadius: '10px',
                        background: '#1976d2',
                        height: "auto",
                        margin: 10,
                        padding: 10
                    }}>
                    Add Feeder
                </Button>
            </Stack>

            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={20}
                rowsPerPageOptions={[6]}
                autoHeight
                disableSelectionOnClick
            />
        </div>
    );
}
