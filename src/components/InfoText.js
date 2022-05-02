import React from 'react';
import PropTypes from 'prop-types';
import style from './InfoText.module.scss';
import classNames from 'classnames';

export default function InfoText(props) {
    return (
        <div className={classNames(props.className, style.info)}>
            {props.children}
        </div>
    );
}
InfoText.propTypes = {
    className: PropTypes.string,
    children: PropTypes.children,
};
InfoText.Emph = Emph;

function Emph(props) {
    return (
        <span className={classNames(
            props.className,
            {
                [style.red]: props.red,
                [style.big]: props.big,
            }
        )}>
            <strong>{props.children}</strong>
        </span>
    );
}
Emph.propTypes = {
    className: PropTypes.string,
    children: PropTypes.children,
    big: PropTypes.bool,
    red: PropTypes.bool,
};