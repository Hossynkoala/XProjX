import * as React from "react";
import {
    Button, Checkbox, Chip,
    Divider,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    InputBase,
    Modal,
    Paper,
    Stack,
    TextField
} from "@mui/material";
import {SendRounded} from "@mui/icons-material";
import {useState} from "react";
import {addFeed} from '../../../DB/DB';

export default function AddFeeds({close, isOpen}) {
    const [active, setactive] = useState(true);
    const [Rsss, setRsss] = useState([]);
    const [Tags, setTags] = useState([]);
    const [valueRss, setValueRss] = useState('');
    const [valueTag, setValueTag] = useState('');
    const [URL, setURL] = useState('');
    const [name, setName] = useState('');


    function sendFeed() {
        const data = {
            URL: '',
            Name: '',
            IsActive: false,
            Tags: [],
            RSSs: []
        }
        data.URL = URL;
        data.Name = name;
        data.IsActive = active;
        console.log(URL);

        Tags.forEach(tg => {

            data.Tags.push(tg.props.label);

        });

        Rsss.forEach(rs => {

            data.RSSs.push(rs.props.label);

        });

        addFeed(data);

    };

    const customChipRss = ({label}) => {
        return (
            <Chip
                size={'small'}
                style={{
                    margin: '3px',
                    background: 'gainsboro',
                    borderRadius: '20px'
                }}
                key={Math.random()}
                hidden={false}
                onDelete={() => {
                    Rsss.forEach(tg => {
                        if (tg.props.label === label)
                            Rsss.splice(Rsss.indexOf(tg), 1);

                    });
                    setRsss([...Rsss]);
                }}
                label={label}/>
        )
    };

    const customChipTag = ({label}) => {
        return (
            <Chip
                size={'small'}
                style={{
                    margin: '3px',
                    background: 'gainsboro',
                    borderRadius: '20px'
                }}
                key={Math.random()}
                hidden={false}
                onDelete={() => {
                    Tags.forEach(tg => {
                        if (tg.props.label === label)
                            Tags.splice(Tags.indexOf(tg), 1);

                    });
                    setTags([...Tags]);
                }}
                label={label}/>
        )
    };

    function addRss() {
        setRsss((T) => {
            Rsss.push(customChipRss({label: valueRss}));
            setRsss(Rsss);
        });
        setValueRss('');
    };


    function addTag() {
        setTags((T) => {
            Tags.push(customChipTag({label: valueTag}));
            setTags(Tags);
        });
        setValueTag('');
    };


    return (
        <Modal onBackdropClick={close} open={isOpen}>
            <FormGroup style={{
                position: 'absolute',
                justifyItems: 'center',
                justifyContent: 'right',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 500,
                height: 700,
                background: 'white',
                borderRadius: "10px",
            }}>

                <h3 style={{
                    width: '90%',
                    margin: '5%'
                }}> Add Feeder </h3>

                <Divider/>

                <TextField value={URL} onChange={(e) => {
                    setURL(e.target.value)
                }} type={'url'} label={"URL"}
                           style={{
                               height: "10px",
                               width: '90%',
                               margin: '5%'
                           }}/>

                <TextField label={"Name"}
                           value={name} onChange={(e) => {
                    setName(e.target.value)
                }}
                           style={{
                               width: '90%',
                               margin: '5%'
                           }}/>

                <Grid style={{
                    width: '90%',
                    margin: '5%',
                }}>

                    <Stack children={Rsss} alignItems="left" flexWrap={'wrap'}
                           justifyContent={'space-evenly'}
                           style={{height: 'auto'}}
                           direction={"row"}>

                    </Stack>
                    <Paper
                        component="form"
                        sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%"}}
                    >

                        <InputBase
                            id={'tagInput'}
                            sx={{ml: 1, flex: 1}}
                            placeholder="Add RSS"
                            value={valueRss}
                            onChange={(text) => {
                                setValueRss(text.target.value);
                            }}
                        />

                        <IconButton
                            onClick={valueRss.length > 0 ? addRss : null}
                            type="button" sx={{p: '10px'}}>
                            <SendRounded/>
                        </IconButton>
                    </Paper>

                </Grid>


                <Grid style={{
                    width: '90%',
                    margin: '5%',
                }}>

                    <Stack children={Tags} alignItems="left" flexWrap={'wrap'}
                           justifyContent={'space-evenly'}
                           style={{height: 'auto'}}
                           direction={"row"}>

                    </Stack>
                    <Paper
                        component="form"
                        sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%"}}
                    >

                        <InputBase
                            sx={{ml: 1, flex: 1}}
                            placeholder="Add Tags"
                            value={valueTag}
                            onChange={(text) => {
                                setValueTag(text.target.value);
                            }}
                        />

                        <IconButton
                            onClick={valueTag.length > 0 ? addTag : null}
                            type="button" sx={{p: '10px'}}>
                            <SendRounded/>
                        </IconButton>
                    </Paper>

                </Grid>


                <FormControlLabel checked={active} onChange={() => {
                    setactive(!active)
                }} style={{
                    width: '90%',
                    margin: '5%'
                }} control={<Checkbox defaultChecked/>} label="Active"/>

                <Stack style={{height: 50, justifyContent: 'center'}} direction={'row'}>

                    <Button onClick={sendFeed} style={{
                        color: 'white',
                        borderRadius: '10px',
                        background: '#1976d2',
                        height: "auto",
                        width: '60%',
                        padding: 10
                    }}>
                        add Feed
                    </Button>
                    <Button variant={'text'} onClick={close} style={{
                        borderRadius: '10px',
                        height: "auto",
                        width: '30%',
                        padding: 10
                    }}>
                        Cancel
                    </Button>
                </Stack>


            </FormGroup>

        </Modal>

    );
}