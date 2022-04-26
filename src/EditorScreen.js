import React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function EditorScreen(props) {
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!props.files.length) {
            navigate('/');
        }
    }, [props.files.length]);
    
    return (
        <>
            {props.files.map((file, index) => (
                <div key={index}>
                    <h2>{file.name}</h2>
                    <img alt={file.name} src={file.content}></img>
                    <br />
                </div>
            ))}
        </>
    );
}

EditorScreen.propTypes = {
    files: PropTypes.array,
};
