
export default function indexFileList(fileList) {
    return fileList.reduce((obj, file) => {
        obj[file.id] = file;
        return obj;
    }, {});
}
