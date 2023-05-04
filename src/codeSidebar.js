import React, { useState } from 'react';
import "./styles.css";

const CodeSidebar = ({ codeSamples }) => {
    console.log(codeSamples)
  const [isVisible, setIsVisible] = useState(false);

  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={isVisible ? "code-sidebar" : ""}>
      <div className='code-toggle' onClick={toggleSidebar}><code>API Mesh Response</code></div>
      <br></br>
      {isVisible &&
        // codeSamples.map((sample, index) => (
        //   <div className="code-sample" key={index}>
            <pre>
              <code>{JSON.stringify(codeSamples, null, 2)}</code>
            </pre>
        //   </div>
        // ))
        }
    </div>
  );
};

export default CodeSidebar;
