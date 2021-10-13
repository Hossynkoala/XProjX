import * as React from 'react';
import {DataGrid,} from '@mui/x-data-grid';
import {RecieveRSSs, updateRSSs} from '../../DB/DB'
import {useEffect, useState} from "react";
import {Box, Button, Modal, Stack, TextField} from "@mui/material";

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
let RSSs = [];
let rowsSelection = [];


export default function Syncer() {


    function Sync() {
        if (rowsSelection.length > 0) {

            for (let r=0;rowsSelection.length>r;r++){
                updateRSSs(`${RSSs[rowsSelection[r]].URL}/${RSSs[rowsSelection[r]].RSSs}`).then(result=>{
                    console.log(result);
                });
            }

        } else {
            console.log("UpdateAll");
        }
    }

    function selectRow(rowsID, Detail) {
        rowsSelection = rowsID;
    }


    const [rows, setRows] = useState([]);

    useEffect(() => {
        RecieveRSSs().then(result => {

            RSSs = [];

            for (let rs = 0; result.length > rs; rs++) {
                RSSs.push(result[rs]);
                result[rs].id = rs;
            }
            setRows(result);

        });

    }, [])


    return (
        <div style={{height: 400, width: '100%'}}>
            <Modal  open={true}>
                <Box style={{
                    position: 'absolute',
                    justifyItems:'center',
                    justifyContent:'center',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    height:600,
                   background:'white',
                    borderRadius:"3%"
                    }}>

                    <TextField type={'url'}  label={"URL"}
                           style={{
                               top:'5%',
                               left:'10%',
                               maxWidth:280,
                               width:'100%',
                               margin:'5%'}} />

                    <TextField label={"Name"}
                               style={{
                                   top:'5%',
                                   left:'10%',
                                   maxWidth:280,
                                   width:'100%',
                                   margin:'5%'}} />


                </Box>

            </Modal>
            <Stack spacing={3} direction={'row'}>
                <Button onClick={Sync}

                        style={{
                            color: 'white',
                            borderRadius: '10%',
                            background: '#1976d2',
                            height: "auto",
                            margin: 10,
                            padding: 10
                        }}>
                    Sync
                </Button>
            </Stack>


            <DataGrid

                onSelectionModelChange={selectRow}
                rows={rows}
                columns={columns}
                pageSize={20}
                rowsPerPageOptions={[6]}
                autoHeight
                disableSelectionOnClick
                checkboxSelection
            />
        </div>
    );
}
