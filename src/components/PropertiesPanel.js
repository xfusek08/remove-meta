import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import style from './PropertiesPanel.module.scss';
import { Resizable } from 're-resizable';
import { AggregatedMetadata } from '../data/ParsedImage';
import RemoveMetadataComponent from './RemoveMetadataComponent';
import FileContext from '../FileContext';

export default function PropertiesPanel(props) {
    
    const context = useContext(FileContext);
    
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
            {context.selectedFile &&
                <div className={style.focusedObjectHeader}>
                    Selected image: <br />
                    <strong>{context.selectedFile.fileName}</strong>
                </div>
            }
            <div className={style.list}>
                {Object.entries(props.aggregation.data).map(([typeName, value]) =>
                    <RemoveMetadataComponent
                        key={typeName}
                        typeName={typeName}
                        total={props.aggregation.total}
                        value={value}
                    />
                )}
            </div>
            
            {/* TODO: render table here */}
            
            <button
                className="button big"
                onClick={context.deleteAllMetadata}
            >
                Delete all metadata
            </button>
        </Resizable>
    );
}
PropertiesPanel.propTypes = {
    aggregation: PropTypes.instanceOf(AggregatedMetadata).isRequired,
};
