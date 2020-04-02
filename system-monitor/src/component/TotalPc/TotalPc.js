import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PcItem from '../PcItem/PcItem'
import One from '../test/One';
import { Container } from 'reactstrap';
import {getFilteredDate, plus30minute} from '../../util/time'
const TotalPc = ({isPolling}) => {
    const nowPolling = (isPolling === "y")? true : false;

    const [pcs, setPcs] = useState(null);

    const getPcs = () => {
        axios.get("mobile/pc")
            .then((response) => {
                console.log(response);
                console.log(response.data.pcs);
                setPcs(response.data.pcs.map(({ powerStatus, ramData, cpuData, startTime, endTime, id }) =>
                    (
                        <PcItem
                            handleOffPc = {handleOffPc}
                            handleDelayPc = {handleDelayPc}
                            id={id}
                            powerStatus={powerStatus}
                            ramData={ramData}
                            cpuData={cpuData}
                            endTime ={endTime}
                        />
                    )));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const postOff = (id,endTime) => {
        axios.post('/mobile/pc/'+id+'/power/'+endTime, {
            params: {
              endTime: endTime
            }
          })
          .then(()=>{
            // getPcs();
          });
    }

    const postDelay = (id,endTime) => {

    }

    const handleOffPc = (id) =>{
        let today = new Date();   
        var sendTime = getFilteredDate(today);
        postOff(id,sendTime);
    }


    const handleDelayPc = (id) =>{
        var sendTime = getFilteredDate(plus30minute());

    }

    useEffect(() => {
        getPcs();
        const res = window.sessionStorage.getItem('isPolling');
        // console.log("Polling State : ");
        // console.log(isPolling);
        // if(!isPolling)return;
        setTimeout(function run() {
            if(res){getPcs();}
            else{console.log("polling nagative");}
            setTimeout(run, 30000);
        }, 30000);
    }, [1])



    const func = (i) => {
        console.log(i);
    }
    let i = 1;


    return (
        <React.Fragment>
              <Container>
              <PcItem
                            handleOffPc = {handleOffPc}
                            handleDelayPc = {handleDelayPc}
                            id={"testId"}
                            powerStatus={"ON"}
                            ramData={"58.234"}
                            cpuData={"34"}
                        />
            </Container>
            <Container>
                {pcs}
            </Container>
        </React.Fragment>
    );
}

export default TotalPc;