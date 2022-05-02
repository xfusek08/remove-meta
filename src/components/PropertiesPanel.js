import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import style from './PropertiesPanel.module.scss';
import { Resizable } from 're-resizable';
import { AggregatedMetadata } from '../data/ParsedImage';
import RemoveMetadataComponent from './RemoveMetadataComponent';
import FileContext from '../FileContext';
import InfoText from './InfoText';

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
            <div className={style.list}>
                {context.selectedFile &&
                    <div className={style.focusedObjectHeader}>
                        <span className={style.fileName}>{context.selectedFile.fileName}</span>
                        <InfoText className={style.info}>
                            <InfoText.Emph big red>{props.aggregation.totalPiecesDeleted}</InfoText.Emph> of <InfoText.Emph big>{props.aggregation.totalPieces}</InfoText.Emph>
                            pieces of data to be removed
                        </InfoText>
                    </div>
                }
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
