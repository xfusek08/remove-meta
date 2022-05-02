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
    const [selectedFile, setSelectedFile] = useState(null);
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
    const aggregation = new AggregatedMetadata(fileList);
    const singleFileAggregation = selectedFile ? new AggregatedMetadata([selectedFile]) : null;
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
                            files,
                            selectedFile,
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
                            deleteKeyword: (word) => setFileList(fileList.map((f) => {
                                f.metadata.deleteKeyword(word);
                                return f;
                            })),
                            restoreKeyword: (word) => setFileList(fileList.map((f) => {
                                f.metadata.restoreKeyword(word);
                                return f;
                            })),
                            removeFile: (id) => {
                                if (id in files) {
                                    const deletedFile = files[id];
                                    setFiles({...files, [id]: undefined});
                                    if (selectedFile?.id === id) {
                                        setSelectedFile(null);
                                    }
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
                            selectSingleFile: (file) => {
                                setSelectedFile(file);
                            },
                            deleteMetadataKeyForFile: (fileId, key) => setFileList(fileList.map((f) => {
                                if (f.id === fileId) {
                                    f.metadata.deleteKey(key);
                                }
                                return f;
                            })),
                            restoreMetadataKeyForFile: (fileId, key) => setFileList(fileList.map((f) => {
                                if (f.id === fileId) {
                                    f.metadata.restoreKey(key);
                                }
                                return f;
                            })),
                            deleteAllKeywordsForFile: (fileId) => setFileList(fileList.map((f) => {
                                if (f.id === fileId) {
                                    f.metadata.deleteAllKeywords();
                                }
                                return f;
                            })),
                            restoreAllKeywordsForFile: (fileId) => setFileList(fileList.map((f) => {
                                if (f.id === fileId) {
                                    f.metadata.restoreAllKeywords();
                                }
                                return f;
                            })),
                            deleteKeywordForFile: (fileId, word) => setFileList(fileList.map((f) => {
                                if (f.id === fileId) {
                                    f.metadata.deleteKeyword(word);
                                }
                                return f;
                            })),
                            restoreKeywordForFile: (fileId, word) => setFileList(fileList.map((f) => {
                                if (f.id === fileId) {
                                    f.metadata.restoreKeyword(word);
                                }
                                return f;
                            })),
                        }}
                    >
                        <Gallery
                            files={fileList}
                            infoBarContent={
                                <div className={style.info}>
                                    <span className={style.big}><span className={style.red}><strong>{aggregation.totalPiecesDeleted}</strong></span></span> of <span className={style.big}><strong>{aggregation.totalPieces}</strong></span>
                                    sensitive pieces of data will be deleted from
                                    <span className={style.big}><strong>{fileList.length}</strong></span> images.
                                </div>
                            }
                        />
                        <PropertiesPanel aggregation={singleFileAggregation ?? aggregation} />
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
