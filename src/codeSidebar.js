import React, { useState } from 'react';
import restResponse from './sampleRest.json'
import "./styles.css";

const CodeSidebar = ({ meshResponse }) => {
  const [isMeshResponseVisible, setisMeshResponseVisible] = useState(false);
  const [isRestResponseVisible, setisRestResponseVisible] = useState(false);

  const toggleMeshSidebar = () => {
    setisMeshResponseVisible(!isMeshResponseVisible);
  };

  const toggleRestSidebar = () => {
    setisRestResponseVisible(!isRestResponseVisible);
  };

  return (
    <div className='results'>
        <div className={isMeshResponseVisible ? "code-sidebar" : ""}>
            <div className='code-toggle' onClick={toggleMeshSidebar}><code>API Mesh Response</code></div>
            <br></br>
            {isMeshResponseVisible &&
                <pre>
                <code>{JSON.stringify(meshResponse, null, 2)}</code>
                </pre>
            }
        </div>

        <div className={isRestResponseVisible ? "code-sidebar" : ""}>
            <div className='code-toggle' onClick={toggleRestSidebar}><code>Rest Response</code></div>
            <br></br>
            {isRestResponseVisible &&
                <pre>
                <code>{JSON.stringify(restResponse, null, 2)}</code>
                </pre>
            }
        </div>
    </div>
  );
};

export default CodeSidebar;
