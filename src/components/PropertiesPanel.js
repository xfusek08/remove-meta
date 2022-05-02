import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import style from './PropertiesPanel.module.scss';
import { Resizable } from 're-resizable';
import { AggregatedMetadata } from '../data/ParsedImage';
import RemoveMetadataComponent from './RemoveMetadataComponent';
import FileContext from '../FileContext';
import InfoText from './InfoText';
import AnimateHeight from 'react-animate-height';

export default function PropertiesPanel(props) {
    const context = useContext(FileContext);
    const [headerData, setHeaderData] = useState({fileName: null, infoText: null});
    
    useEffect(() => {
        if (context.selectedFile) {
            setHeaderData({
                fileName: context.selectedFile?.fileName,
                infoText: (
                    <InfoText className={style.info}>
                        <InfoText.Emph big red>{props.aggregation.totalPiecesDeleted}</InfoText.Emph> of <InfoText.Emph big>{props.aggregation.totalPieces}</InfoText.Emph>
                        pieces of data will be removed.
                    </InfoText>
                ),
            });
        }
    }, [
        context.selectedFile?.fileName,
        props.aggregation.totalPiecesDeleted,
        props.aggregation.totalPieces
    ]);
    
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
            <AnimateHeight
                className={style.headerShadow}
                style={{flexShrink: 0}}
                duration={ 500 }
                height={ headerData.fileName && context.selectedFile ?  'auto' : 0 }
            >
                <div className={style.focusedObjectHeader}>
                    <span className={style.fileName}>{headerData.fileName}</span>
                    {headerData.infoText}
                </div>
            </AnimateHeight>
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
