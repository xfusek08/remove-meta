import React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import style from './EditorScreen.module.scss';
import log from 'loglevel';
import PropertiesPanel from './components/PropertiesPanel';
import ParsedImage, { AggregatedMetadata } from './data/ParsedImage';
import Gallery from './components/Gallery';

export default function EditorScreen(props) {
    const navigate = useNavigate();
    
    // redirect to home screen when no files are loaded
    useEffect(() => {
        if (!props.files.length) {
            navigate('/');
        }
    }, [props.files.length]);
    
    return (
        <div className={style.container}>
            
            <div className={style.topBar}>
                <h2>Metadata Remover</h2>
                <button
                    className="button big"
                    onClick={() => {
                        log.info('download as zip');
                    }}
                >
                    Download ZIP
                </button>
            </div>
            
            <div className={style.body}>
                <Gallery files={props.files} />
                <PropertiesPanel
                    aggregatedMetadata={new AggregatedMetadata(props.files.map((p) => p.metadata))}
                />
            </div>
        </div>
    );
}
EditorScreen.propTypes = {
    files: PropTypes.arrayOf(ParsedImage),
};
