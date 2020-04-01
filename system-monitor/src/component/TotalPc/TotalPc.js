import React,{useState,useEffect} from 'react';
import axios from 'axios';
import One from '../test/One';
const TotalPc = () => {
    const [pcs,setPcs] = useState(null);

    const getPcs = () => {
        axios.get("mobile/pc")
        .then(function (response) {
          console.log(response);
          console.log(response.data.pcs);

            setPcs(response.data.pcs.map(({powerStatus,ramData,cpuData,startTime,endTime,id}) => 
            (
                <div>
                    <p>{id}</p>
                    <p>{powerStatus}</p>
                    <p>{ramData}</p>
                    <p>{cpuData}</p>

                </div>
            )));

        // test = response.data.pcs.map(({powerStatus,ramData,startTime,endTime,id}) => 
        // (
        //     <div>
        //         <p>{id}</p>
        //         <p>{ramData}</p>
        //     </div>
        // ))

        console.log("test is");
        console.log(test);
            // response.data.pcs.map(({})=>{})
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    useEffect(()=>{
        getPcs();
        setTimeout(function run() {
            getPcs();
            setTimeout(run, 30000);
          }, 30000);
    },[1])

    
  
    const func = (i) => {
      console.log(i);
    }
    let i = 1;
   
    
    return(
        <React.Fragment>
        {pcs}
        </React.Fragment>
    );
}

export default TotalPc;