import React from 'react';

export const defaultFileContext = {
    files: {},
    selectedFile: null,
    deleteAllMetadata: () => {},
    deleteAllMetadataOfKey: () => {},
    restoreAllMetadataOfKey: () => {},
    deleteAllKeywords: () => {},
    restoreAllKeywords: () => {},
    deleteKeyword: () => {},
    restoreKeyword: () => {},
    removeFileFile: () => {},
    selectSingleFile: () => {},
    deleteMetadataKeyForFile: () => {},
    restoreMetadataKeyForFile: () => {},
    deleteAllKeywordsForFile: () => {},
    restoreAllKeywordsForFile: () => {},
    deleteKeywordForFile: () => {},
    restoreKeywordForFile: () => {},
};

const FileContext = React.createContext(defaultFileContext);
export default FileContext;
