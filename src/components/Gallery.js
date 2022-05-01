import React from 'react';
import PropTypes from 'prop-types';
import style from './Gallery.module.scss';
import GalleryItem from './GalleryItem';
import ParsedImage from '../data/ParsedImage';

export default function Gallery(props) {
    return (
        <div className={style.scroll}>
            <div className={style.gallery}>
                {props.files.map((file) => (
                    <GalleryItem key={file.id} file={file} />
                ))}
            </div>
        </div>
    );
}
Gallery.propTypes = {
    files: PropTypes.arrayOf(ParsedImage).isRequired, // result of to_image function with standardized interface
};
