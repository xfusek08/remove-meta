import React from 'react';
// import PropTypes from 'prop-types';
import style from './PropertiesPanel.module.scss';
import log from 'loglevel';
import { Resizable } from 're-resizable';

export default function PropertiesPanel() {
    return (
        <Resizable
            className={style.propertiesPanel}
            defaultSize={{
                width: 300,
                height: '100%',
            }}
            minWidth={300}
            maxWidth="50%"
            enable={{
                top: false,
                right: true,
                bottom: false,
                left: true,
                topRight: false,
                bottomRight: false,
                bottomLeft: false,
                topLeft: false
            }}
        >
            <div className={style.list}>
            </div>
            
            {/* TODO: render table here */}
            
            <button
                className="button big"
                onClick={() => {
                    log.info('Delete all metadata');
                }}
            >
                Delete all metadata
            </button>
        </Resizable>
    );
}
PropertiesPanel.propTypes = {
};