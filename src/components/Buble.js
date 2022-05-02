import React from 'react';
import PropTypes from 'prop-types';
import style from './Buble.module.scss';
import cross from '../icons/cross.svg';
import restoreIcon from '../icons/restore.svg';
import classNames from 'classnames';

export default function Buble(props) {
    return (
        <div
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
            className={classNames(
                style.buble,
                { [style.red]: !!props.onRestore }
            )}
        >
            <span>{props.text}</span>
            <button
                className={classNames(style.iconButton, { [style.hidden]: !props.onDelete } )}
                onClick={props.onDelete}
            >
                <img src={cross} />
            </button>
            <button
                className={classNames(style.iconButton, { [style.hidden]: !props.onRestore } )}
                onClick={props.onRestore}
            >
                <img src={restoreIcon} />
            </button>
        </div>
    );
}
Buble.propTypes = {
    text: PropTypes.string.isRequired,
    onDelete: PropTypes.func,
    onRestore: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
};
