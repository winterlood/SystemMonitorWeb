import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PcItem from '../PcItem/PcItem'
import { Container, Spinner } from 'reactstrap';
import Fab from '@material-ui/core/Fab';

const TotalPc = ({ isPolling }) => {
    const [pcs, setPcs] = useState(null);

    const getPcs = () => {
        axios.get("mobile/pc")
            .then((response) => {
                // console.log(response);
                // console.log(response.data.pcs);
                var sortingField = "powerStatus";
                const sortedResponse = response.data.pcs.sort((a,b)=>{
                    return a[sortingField] - b[sortingField];
                })
                console.log("정렬된 response");
                console.log(sortedResponse);
                setPcs(sortedResponse.map(({ powerStatus, ramData, cpuData, startTime, endTime, id }) =>
                    (
                        <PcItem
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
            }, 5000);
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
            <Fab/>
            <Container>
                <div>
                    <RenderPollingState/>
                </div>
                <PcItem
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