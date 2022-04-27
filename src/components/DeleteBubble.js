import React from 'react';
import PropTypes from 'prop-types';
import style from './RemoveMetadataComponent.module.scss';

export default function DeleteBubble(props) {
    const text = props.total === props.value
        ? `all ${props.total}`
        : `${props.value} of ${props.total}`;
        
    return (
        <div className={style.buble}>
            <span>{text}</span>
            <div className={style.deleteButton}>
                delete
            </div>
        </div>
    );
}

DeleteBubble.propTypes = {
    total: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
