// /* eslint-disable array-callback-return */
// import * as React from "react";
 
// const PageNotFound = () => {
    
//     return(
//     <div>
//         <h1>404 Error</h1>
//         <h1>Page Not Found</h1>
//     </div>
//     )
// }
 
// export default PageNotFound;
import React from "react";
import "./pagenotfound.scss"

const PageNotFound = () => {
    function refreshPage() {
        window.location.reload(false);
      }
    return(
        <>
        <div className="noise"></div>
        <div className="over"></div>
        <div className="terminal">
            <h1 className="errorcode">Error <span className="errorcode">404</span></h1>
            <p className="output">The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
            <p className="output">Please try to <a className="anchor" onClick={refreshPage} href="#1">refresh this page</a> or <a className="anchor" href="/">return to the homepage</a>.</p>
            <p className="output">Good luck.</p>
        </div>
        </>
    )
}

export default PageNotFound