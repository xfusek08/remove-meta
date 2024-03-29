import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import style from './GalleryItem.module.scss';
import ParsedImage from '../data/ParsedImage';
import classNames from 'classnames';
import FileContext from '../FileContext';
import deleteIcon from '../icons/blue_cross.svg';

export default function GalleryItem(props) {
    const deletedCount = props.file.metadata.getDeletedCount();
    const context = useContext(FileContext);
    const isSelected = context.selectedFile?.id === props.file.id;
    
    return (
        <div
            className={classNames(
                style.galleryItem,
                {
                    [style.selected]: isSelected,
                    [style.highlighted]: context.highlightedIds.includes(props.file.id),
                }
            )}
            onClick={(e) => {
                e.stopPropagation();
                context.selectSingleFile(!isSelected ? props.file : null);
            }}
        >
            <div
                className={style.deleteButton}
                onClick={(e) => {
                    e.stopPropagation();
                    context.removeFile(props.file.id);
                }}
                // data-tip="Remove this image"
            >
                <img src={deleteIcon}></img>
            </div>
            <div className={style.image}>
                <img alt={props.file.fileName} src={props.file.urlData}></img>
            </div>
            <DeleteCounter
                count={deletedCount}
            />
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

function DeleteCounter(props) {
    const [count, setCount] = useState(props.count);
    const [skip, setSkip] = useState(false);
    
    useEffect(() => {
        if (props.count != count) {
            setCount(props.count);
            setTimeout(() => {
                setSkip(true);
                setTimeout(() => {
                    setSkip(false);
                }, 200);
            }, count === 0 ? 100 : 10);
        }
    }, [props.count]);
    
    return count > 0 ? (
        <div
            className={classNames(
                style.deletedCount,
                { [style.skip]: skip }
            )}
        >
            -{count}
        </div>
    ) : null;
}
DeleteCounter.propTypes = {
    count: PropTypes.number.isRequired,
};
