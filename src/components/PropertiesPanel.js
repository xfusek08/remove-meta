import React from 'react';
import PropTypes from 'prop-types';
import style from './PropertiesPanel.module.scss';
import log from 'loglevel';
import { Resizable } from 're-resizable';
import { useEffect } from 'react';
import { AggregatedMetadata } from '../data/ParsedImage';
import RemoveMetadataComponent from './RemoveMetadataComponent';

export default function PropertiesPanel(props) {
    
    useEffect(() => {
        log.info({ aggregatedMetadata: props.aggregatedMetadata });
    }, []);
    
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
                right: false,
                bottom: false,
                left: true,
                topRight: false,
                bottomRight: false,
                bottomLeft: false,
                topLeft: false
            }}
        >
            <div className={style.list}>
                {Object.entries(props.aggregatedMetadata.data).map(([typeName, value]) =>
                    <RemoveMetadataComponent
                        key={typeName}
                        typeName={typeName}
                        total={props.aggregatedMetadata.total}
                        value={value}
                    />
                )}
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
    aggregatedMetadata: PropTypes.instanceOf(AggregatedMetadata).isRequired,
};
