import React,{Component} from 'react';
import './PcItem.css';
import { Spinner, Alert, Progress, Row, Collapse, Button, CardBody, Card } from 'reactstrap';
import { CardHeader } from '@material-ui/core';
import axios from 'axios';
import {getFilteredDate, plus30minute} from '../../util/time'
class PcItem extends Component{
    //({handleOffPc,handleDelayPc, id, powerStatus, ramData, cpuData, endTime })
    
    constructor(props){
        super(props);
        var currentDate = new Date();
        var now = currentDate.getHours()+"시"
        now += currentDate.getMinutes()+"분";
        now += currentDate.getSeconds()+"초";
        this.state= {
            id : this.props.id,
            powerStatus : this.props.powerStatus,
            ramData : this.props.ramData,
            cpuData : this.props.cpuData,
            endTime : this.props.endTime,
            isOpen : false,
            nowOffButtonRunning : false,
            updateTime : now
        }
    }


    render(){
    const {id,powerStatus,ramData,cpuData,endTime,isOpen,nowOffButtonRunning,updateTime} = this.state;
    

    
    console.log("render This!" + id);

    const {handleOffPc} = this.props;
    const Offlight = () => {
        return <div className="off-light"></div>
    }
    const Onlight = () => {
        return <div className="on-light"></div>
    }
    const Powerlight = () => {
        if (powerStatus === "ON" || powerStatus === "On") {
            return <Onlight></Onlight>
        }
        else return <Offlight></Offlight>
    }

    const toggle = () => {
        this.setState({
            isOpen : !isOpen
        })
    }

    const pcOffEvent = () =>{
        this.setState({
            nowOffButtonRunning : true
        })
        document.getElementById('offButton').disable=true;
        let today = new Date();   
        var sendTime = getFilteredDate(today);
        axios.post('/mobile/pc/'+id+'/power/'+sendTime, {
            params: {
              endTime: sendTime
            }
          })
          .then(()=>{
            reload();
          });
    }

    const reload = () =>{
        var currentDate = new Date();
        var now = currentDate.getHours()+"시"
        now += currentDate.getMinutes()+"분";
        now += currentDate.getSeconds()+"초";
        axios.get("pc/"+id)
            .then((response) =>{
                console.log(response);
                this.setState({
                    id:response.data.id,
                    powerStatus:response.data.powerStatus,
                    ramData:response.data.ramData,
                    cpuData:response.data.cpuData,
                    endTime:response.data.endTime,
                    nowOffButtonRunning:false,
                    updateTime:now
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const OffButtonState = () =>{
        if(nowOffButtonRunning){
            return (<div>현재 서버와 통신중입니다....<Spinner size="sm" color="secondary" /></div>);
        }
        else{
            return (
            <Button id="offButton" onClick={()=>pcOffEvent(id)}>OFF</Button>
            );
        }
    }

    const CollapseChild = () => {
        return (
            <Card>
                <CardBody>
                    <p>RAM : {ramData}</p>
                    <Progress value={ramData} />

                    <p>CPU : {cpuData}</p>
                    <Progress value={cpuData} />

                    <p>EndTime : {endTime}</p>
                    <OffButtonState/>
                    <Button onClick={toggle}>-</Button>
                </CardBody>
            </Card>
        );
        if (powerStatus === "ON" || powerStatus === "On") {
            return (
                <Card>
                    <CardBody>
                        <p>RAM : {ramData}</p>
                        <Progress value={ramData} />

                        <p>CPU : {cpuData}</p>
                        <Progress value={cpuData} />
                        <Button onClick={pcOffEvent(id)}>>OFF</Button>
                        <Button onClick={toggle}>-</Button>

                    </CardBody>
                </Card>
            );
        }
        else {
            return (
                <div className="pc-off-alert-box">
                    <Alert color="dark">
                    이 PC는 종료되었습니다.
                         </Alert>
                </div>
             
            );
        }
    }

    return (
        <React.Fragment>
            <Row>
                <div className="pc-item-wrapper">
                    <Powerlight />
                    <div  onClick={toggle}  className="id-box">
                        <p>
                            <span className="id-span">{id}
                            </span>
                        <span className="update-log">
                           UPDATED : {updateTime}
                            </span>
      
                        </p>
                    </div>
                    <Collapse isOpen={isOpen}>
                        <CollapseChild/>
                    </Collapse>
                    {/* <p>{powerStatus}</p>
                <p>{ramData}</p>
                <p>{cpuData}</p> */}
                </div>
            </Row>
        </React.Fragment>
    );
}
}

export default PcItem;