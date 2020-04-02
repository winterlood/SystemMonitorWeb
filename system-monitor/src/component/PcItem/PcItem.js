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
        this.state= {
            id : this.props.id,
            powerStatus : this.props.powerStatus,
            ramData : this.props.ramData,
            cpuData : this.props.cpuData,
            endTime : this.props.endTime,
            isOpen : false
        }
    }


    render(){
    const {id,powerStatus,ramData,cpuData,endTime,isOpen} = this.state;
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
        axios.get("pc/"+id)
            .then((response) =>{
                console.log(response);
                this.setState({
                    id:response.data.id,
                    powerStatus:response.data.powerStatus,
                    ramData:response.data.ramData,
                    cpuData:response.data.cpuData,
                    endTime:response.data.endTime
                });
            })
            .catch(function (error) {
                console.log(error);
            });
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

                    <Button onClick={()=>pcOffEvent(id)}>OFF</Button>
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
                            최신 업데이트 : 2020-04-20-23
                            </span>
                            <Spinner size="sm" color="secondary" />
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