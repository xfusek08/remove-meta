import React from 'react';
import PropTypes from 'prop-types';
import style from './GalleryItem.module.scss';

export default function GalleryItem(props) {
    return (
        <div className={style.galleryItem}>
            <div className={style.image}>
                <img alt={props.file.name} src={props.file.content}></img>
            </div>
            <div className={style.text}>
                <div className={style.name}>{props.file.name}</div>
                <div className={style.dimensions}>{`${props.file.dimensions[0]} x ${props.file.dimensions[1]}`}</div>
            </div>
        </div>
    );
}
GalleryItem.propTypes = {
    file: PropTypes.object.isRequired,
};