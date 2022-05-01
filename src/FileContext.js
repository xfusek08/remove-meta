import React from 'react';

export const defaultFileContext = {
    files: [],
    deleteAllMetadataOfKey: () => {},
    deleteAllKeywords: () => {},
    deleteKeyword: () => {},
};

const FileContext = React.createContext(defaultFileContext);
export default FileContext;
