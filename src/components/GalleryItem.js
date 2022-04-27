import React from 'react';
import PropTypes from 'prop-types';
import style from './GalleryItem.module.scss';
import ParsedImage from '../data/ParsedImage';

export default function GalleryItem(props) {
    return (
        <div className={style.galleryItem}>
            <div className={style.image}>
                <img alt={props.file.fileName} src={props.file.urlData}></img>
            </div>
            <div className={style.text}>
                <div className={style.name}>{props.file.fileName}</div>
                <div className={style.dimensions}>
                    {`${props.file.dimensions[0]} x ${props.file.dimensions[1]}`}
                </div>
            </div>
        </div>
    );
}
GalleryItem.propTypes = {
    galleryWidth: PropTypes.number,
    file: PropTypes.instanceOf(ParsedImage).isRequired, // result of to_image function with standardized interface
};
