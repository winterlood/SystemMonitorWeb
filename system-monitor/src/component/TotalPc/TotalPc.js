import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PcItem from '../PcItem/PcItem'
import One from '../test/One';
import { Container, Spinner } from 'reactstrap';
import { getFilteredDate, plus30minute } from '../../util/time'
const TotalPc = ({ isPolling }) => {
    const [pcs, setPcs] = useState(null);

    const getPcs = () => {
        axios.get("mobile/pc")
            .then((response) => {
                console.log(response);
                console.log(response.data.pcs);
                setPcs(response.data.pcs.map(({ powerStatus, ramData, cpuData, startTime, endTime, id }) =>
                    (
                        <PcItem
                            handleOffPc={handleOffPc}
                            handleDelayPc={handleDelayPc}
                            id={id}
                            key={id}
                            powerStatus={powerStatus}
                            ramData={ramData}
                            cpuData={cpuData}
                            endTime={endTime}
                        />
                    )));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const postOff = (id, endTime) => {
        axios.post('/mobile/pc/' + id + '/power/' + endTime, {
            params: {
                endTime: endTime
            }
        })
            .then(() => {
                // getPcs();
            });
    }

    const postDelay = (id, endTime) => {

    }

    const handleOffPc = (id) => {
        let today = new Date();
        var sendTime = getFilteredDate(today);
        postOff(id, sendTime);
    }

    

    const handleDelayPc = (id) => {
        var sendTime = getFilteredDate(plus30minute());

    }

    useEffect(() => {
        console.log("Total Pc Render!");
    })

    useEffect(() => {
        console.log("useEffect!");
        getPcs();
    }, [1])

    useEffect(() => {
        if (isPolling) {
            const intervals = setInterval(() => {
                getPcs();
            }, 30000);
            return () => clearInterval(intervals);
        }
        else{
            console.log("Polling is stopped");
        }
    }, [isPolling])


    const RenderPollingState = () =>{
        if(isPolling){
            return (
                <Spinner size="sm" color="secondary" />
            );
        }
        else{
            return (<p>현재 polling 중단</p>);
        }
    }

    return (
        <React.Fragment>
            <Container>
                <div>
                    <RenderPollingState/>
                </div>
                <PcItem
                    handleOffPc={handleOffPc}
                    handleDelayPc={handleDelayPc}
                    id={"testId"}
                    key={"testKey"}
                    powerStatus={"ON"}
                    ramData={"58.234"}
                    cpuData={"34"}
                    startTime={"2020-04-04-12-12"}
                    endTime={"2020-04-04-13-13"}
                />
            </Container>
            <Container>
                {pcs}
            </Container>
        </React.Fragment>
    );
}

export default TotalPc;