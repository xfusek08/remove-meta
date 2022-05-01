import React, { useState,  useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import style from './EditorScreen.module.scss';
import log from 'loglevel';
import PropertiesPanel from './components/PropertiesPanel';
import Gallery from './components/Gallery';
import FileContext, { defaultFileContext } from './FileContext';
import ReactTooltip from 'react-tooltip';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AggregatedMetadata } from './data/ParsedImage';
import indexFileList from './data/indexFileList';

export default function EditorScreen(props) {
    const navigate = useNavigate();
    const [files, setFiles] = useState(props.files);
    const fileList = Object.values(files).filter((f) => !!f);
    
    const filesRef = useRef();
    filesRef.current = files;
    
    // redirect to home screen when no files are loaded
    useEffect(() => {
        if (!fileList.length) {
            navigate('/');
        }
    }, [files]);
    
    const setFileList = (fileList) => setFiles(indexFileList(fileList));
    
    return (
        <>
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
                            files: fileList,
                            deleteAllMetadata: () => setFileList(fileList.map((f) => {
                                f.metadata.deleteAll();
                                return f;
                            })),
                            deleteAllMetadataOfKey: (key) => setFileList(fileList.map((f) => {
                                f.metadata.deleteKey(key);
                                return f;
                            })),
                            restoreAllMetadataOfKey: (key) => setFileList(fileList.map((f) => {
                                f.metadata.restoreKey(key);
                                return f;
                            })),
                            deleteAllKeywords: () => setFileList(fileList.map((f) => {
                                f.metadata.deleteAllKeywords();
                                return f;
                            })),
                            restoreAllKeywords: () => setFileList(fileList.map((f) => {
                                f.metadata.restoreAllKeywords();
                                return f;
                            })),
                            deleteKeyWord: (word) => setFileList(fileList.map((f) => {
                                f.metadata.deleteKeyword(word);
                                return f;
                            })),
                            restoreKeyWord: (word) => setFileList(fileList.map((f) => {
                                f.metadata.restoreKeyWord(word);
                                return f;
                            })),
                            removeFile: (id) => {
                                log.info(`removeFile ${id}`, files);
                                if (id in files) {
                                    log.info('removeFile 2');
                                    const deletedFile = files[id];
                                    setFiles({...files, [id]: undefined});
                                    toast.info(({ closeToast }) => (
                                        <div className={style.undoNotification}>
                                            <span>File <strong>{deletedFile.fileName}</strong> was removed.</span>
                                            <button onClick={() => {
                                                closeToast();
                                                setFiles({ ...filesRef.current, [deletedFile.id]: deletedFile });
                                            }} >Undo</button>
                                        </div>
                                    ));
                                }
                            },
                        }}
                    >
                        <Gallery files={fileList} />
                        <PropertiesPanel
                            aggregatedMetadata={new AggregatedMetadata(fileList.map((p) => p.metadata))}
                        />
                    </FileContext.Provider>
                </div>
            </div>
            <ReactTooltip
                effect='solid'
                delayShow={1500}
                delayHide={200}
            />
            <ToastContainer
                className={style.toastContainer}
                position="bottom-left"
                autoClose={6000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
}
EditorScreen.propTypes = {
    files: PropTypes.object,
};
