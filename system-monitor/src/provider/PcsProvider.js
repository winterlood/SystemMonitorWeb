import React, { useState, useEffect, Children } from "react";
import axios from "axios";

const PcsProvider = ({ isPolling, handlePolling, children }) => {
    const [pcs, setPcs] = useState(null);
    const [onPcs, setOnPcs] = useState(null);
    const [offPcs, setOffPcs] = useState(null);
    const [classDict, setClassDict] = useState(null);

    const getPcs = () => {
        axios
            .get("http://13.125.208.19/mobile/pc")
            .then((response) => {
                var pcsData = response.data.pcs;
                const filterOn = pcsData.filter((it) => it.powerStatus === "ON" || it.powerStatus === "On");
                setOnPcs(
                    filterOn.map(({ powerStatus, ramDasta, cpuData, startTime, endTime, id }) => (
                        <PcItem
                            key={id}
                            id={id}
                            powerStatus={powerStatus}
                            ramData={ramData}
                            cpuData={cpuData}
                            endTime={endTime}
                        />
                    ))
                );
                const filterOff = pcsData.filter((it) => it.powerStatus === "OFF" || it.powerStatus === "Off");
                setOffPcs(
                    filterOff.map(({ powerStatus, ramData, cpuData, startTime, endTime, id }) => (
                        <PcItem
                            key={id}
                            id={id}
                            powerStatus={powerStatus}
                            ramData={ramData}
                            cpuData={cpuData}
                            endTime={endTime}
                        />
                    ))
                );
                setPcs(
                    pcsData.map(({ powerStatus, ramData, cpuData, startTime, endTime, id }) => (
                        <PcItem
                            key={id}
                            id={id}
                            powerStatus={powerStatus}
                            ramData={ramData}
                            cpuData={cpuData}
                            endTime={endTime}
                        />
                    ))
                );
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    useEffect(() => {
        console.log("useEffect!");
        getPcs();
    }, [1]);
    useEffect(() => {
        if (isPolling) {
            const intervals = setInterval(() => {
                getPcs();
            }, 30000);
            return () => clearInterval(intervals);
        } else {
            console.log("Polling is stopped");
        }
    }, [isPolling]);
    return <Children onPcs={onPcs} offPcs={offPcs} />;
};

export default PcsProvider;
