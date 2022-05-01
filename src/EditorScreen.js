import React, { useState,  useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import style from './EditorScreen.module.scss';
import log from 'loglevel';
import PropertiesPanel from './components/PropertiesPanel';
import ParsedImage, { AggregatedMetadata } from './data/ParsedImage';
import Gallery from './components/Gallery';
import FileContext, { defaultFileContext } from './FileContext';

export default function EditorScreen(props) {
    const [files, setFiles] = useState(props.files);
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
                <FileContext.Provider
                    value={{
                        ...defaultFileContext,
                        files: files,
                        deleteAllMetadata: () => setFiles(files.map((f) => {
                            f.metadata.deleteAll();
                            return f;
                        })),
                        deleteAllMetadataOfKey: (key) => setFiles(files.map((f) => {
                            f.metadata.deleteKey(key);
                            return f;
                        })),
                        restoreAllMetadataOfKey: (key) => setFiles(files.map((f) => {
                            f.metadata.restoreKey(key);
                            return f;
                        })),
                        deleteAllKeywords: () => setFiles(files.map((f) => {
                            f.metadata.deleteAllKeywords();
                            return f;
                        })),
                        restoreAllKeywords: () => setFiles(files.map((f) => {
                            f.metadata.restoreAllKeywords();
                            return f;
                        })),
                        deleteKeyWord: (word) => setFiles(files.map((f) => {
                            f.metadata.deleteKeyword(word);
                            return f;
                        })),
                        restoreKeyWord: (word) => setFiles(files.map((f) => {
                            f.metadata.restoreKeyWord(word);
                            return f;
                        })),
                    }}
                >
                    <Gallery files={files} />
                    <PropertiesPanel
                        aggregatedMetadata={new AggregatedMetadata(files.map((p) => p.metadata))}
                    />
                </FileContext.Provider>
            </div>
        </div>
    );
}
EditorScreen.propTypes = {
    files: PropTypes.arrayOf(ParsedImage),
};
