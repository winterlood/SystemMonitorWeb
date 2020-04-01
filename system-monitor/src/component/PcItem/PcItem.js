import React,{useState} from 'react';
import './PcItem.css';
import { Row, Collapse, Button, CardBody, Card } from 'reactstrap';

const PcItem = ({id,powerStatus,ramData,cpuData}) => {
    const Offlight = () =>{
        return <div className="off-light"></div>
    }
    const Onlight =()=>{
        return <div className="on-light"></div>
    }
    const Powerlight = () =>{
        if(powerStatus==="ON" || powerStatus ==="On"){
            return <Onlight></Onlight>
        }
        else return <Offlight></Offlight>
    }
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return(
        <React.Fragment>
            <Row>
            <div className="pc-item-wrapper">
            <Powerlight/>
                <div className="id-box">
                    <p>{id}
                    <Button color="primary" className="expand-button" onClick={toggle}>Show more</Button>
                    </p>                
                </div>
                <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
            <p>RAM : {ramData}</p> 
            <p>CPU : {cpuData}</p> 
          </CardBody>
        </Card>
      </Collapse>
                {/* <p>{powerStatus}</p>
                <p>{ramData}</p>
                <p>{cpuData}</p> */}
            </div>
            </Row>
        </React.Fragment>
    );
}

export default PcItem;