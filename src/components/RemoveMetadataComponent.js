import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import style from './RemoveMetadataComponent.module.scss';
import Buble from './Buble';
import FileContext from '../FileContext';
import { MetadataTypeDefinitions } from '../MetadataTypeDefinitions';

export default function RemoveMetadataComponent(props) {
    let label = props.typeName;
    let icon = null;
    let Component = null;
    
    if (props.typeName in MetadataTypeDefinitions) {
        const definition = MetadataTypeDefinitions[props.typeName];
        Component = definition.specialComponent ?? RenderGeneralDeleteMetadataComponent;
        icon = definition.icon;
        label = definition.label;
    } else {
        Component = RenderGeneralDeleteMetadataComponent;
    }
    
    return (
        <Component
            icon={icon}
            label={label}
            value={props.value}
            total={props.total}
            typeName={props.typeName}
        />
    );
}
RemoveMetadataComponent.propTypes = {
    typeName: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    value: PropTypes.any,
};


export function RenderGeneralDeleteMetadataComponent(props) {
    
    const context = useContext(FileContext);
    
    const text = props.total === props.value.count
        ? `all ${props.total}`
        : `${props.value.count} of ${props.total}`;
    
    const isRestore = props.value.deleted === props.value.count;
    
    return (
        <div className={style.container}>
            <div className={style.info}>
                {props.icon &&
                    <div className={style.icon}>
                        <img src={props.icon} alt={props.label}/>
                    </div>
                }
                <div className={style.label}>{props.label}</div>
            </div>
            <div className={style.bubbles}>
                <Buble
                    text={text}
                    onDelete={!isRestore ? () => context.deleteAllMetadataOfKey(props.typeName) : null}
                    onRestore={isRestore ? () => context.restoreAllMetadataOfKey(props.typeName) : null}
                />
            </div>
        </div>
    );
}
RenderGeneralDeleteMetadataComponent.propTypes = {
    icon: PropTypes.string, // TODO: icon component?
    label: PropTypes.string.isRequired,
    value: PropTypes.object.isRequired,
    total: PropTypes.number.isRequired,
    typeName: PropTypes.string.isRequired,
};

export function DeleteKeywordsComponent(props) {
    const context = useContext(FileContext);
    
    let total = 0;
    let totalDeleted = 0;
    Object.values(props.value).forEach((v) => {
        total += v.count;
        totalDeleted += v.deleted;
    });
    
    const isTotalRestore = total === totalDeleted;
    
    return (
        <div className={style.keywords}>
            <div className={style.container}>
                <div className={style.info}>
                    {props.icon &&
                        <div className={style.icon}>
                            <img src={props.icon}/>
                        </div>
                    }
                    <div className={style.label}>Keywords</div>
                </div>
                <div>
                    <Buble
                        text={`${total} in total`}
                        onDelete={!isTotalRestore ? () => context.deleteAllKeywords() : null}
                        onRestore={isTotalRestore ? () => context.restoreAllKeywords() : null}
                    />
                </div>
            </div>
            <div className={style.bubbles}>
                {Object.entries(props.value).map(([word, value]) => {
                    const text = `${value.count} | ${word}`;
                    const isRestore = value.deleted == value.count;
                    return (
                        <Buble
                            key={word}
                            text={text}
                            onDelete={!isRestore ? () => context.deleteKeyWord(word) : null}
                            onRestore={isRestore ? () => context.restoreKeyWord(word) : null}
                        />
                    );
                })}
            </div>
        </div>
    );
}
DeleteKeywordsComponent.propTypes = {
    icon: PropTypes.string, // TODO: icon component?
    label: PropTypes.string.isRequired,
    value: PropTypes.object.isRequired,
};
