import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import style from './Gallery.module.scss';
import GalleryItem from './GalleryItem';
import ParsedImage from '../data/ParsedImage';
import FileContext from '../FileContext';

export default function Gallery(props) {
    const context = useContext(FileContext);
    return (
        <div className={style.scroll}>
            {!!props.infoBarContent &&
                <div className={style.infoBar}>
                    {props.infoBarContent}
                </div>
            }
            <div
                className={style.gallery}
                onClick={() => context.selectSingleFile(null)}
            >
                {props.files.map((file) => (
                    <GalleryItem key={file.id} file={file} />
                ))}
            </div>
        </div>
    );
}
Gallery.propTypes = {
    files: PropTypes.arrayOf(ParsedImage).isRequired, // result of to_image function with standardized interface
    infoBarContent: PropTypes.any,
};
