import React, { useEffect } from "react";

const IndexPage = () => {
    useEffect(() => {
        window.location.replace("/class");
    }, [1]);
    return <div>Loading now....</div>;
};

export default IndexPage;
