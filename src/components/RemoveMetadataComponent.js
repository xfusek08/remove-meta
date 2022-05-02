import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import style from './RemoveMetadataComponent.module.scss';
import Buble from './Buble';
import FileContext from '../FileContext';
import { MetadataTypeDefinitions } from '../MetadataTypeDefinitions';
import log from 'loglevel';

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
    
    const [text, onDelete, onRestore] = (() => {
        if (props.total === 1) {
            const deleted = props.value.isDeleted;
            return [
                props.value.content,
                !deleted ? () => context.deleteMetadataKeyForFile(props.value.id, props.typeName) : null,
                deleted ? () => context.restoreMetadataKeyForFile(props.value.id, props.typeName) : null,
            ];
        }
        const count = props.value.ids.length;
        const deleted = props.value.deleted === count;
        return [
            props.total === count ? `all ${props.total}` : `${count} of ${props.total}`,
            !deleted ? () => context.deleteAllMetadataOfKey(props.typeName) : null,
            deleted ? () => context.restoreAllMetadataOfKey(props.typeName) : null,
        ];
    })();
    
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
                    onDelete={onDelete}
                    onRestore={onRestore}
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
    
    const [total, onDeleteAll, onRestoreAll] = (() => {
        if (props.total === 1) {
            const deleted = Object.values(props.value.keywords)
                .map((v) => v.isDeleted)
                .every((b) => b);
            return [
                props.value.keywords.length,
                !deleted ? () => context.deleteAllKeywordsForFile(props.value.id) : null,
                deleted ? () => context.restoreAllKeywordsForFile(props.value.id) : null,
            ];
        }
        
        // keywords aggregation data
        let total = 0;
        let totalDeleted = 0;
        Object.values(props.value.keywords).forEach((v) => {
            total += v.ids.length;
            totalDeleted += v.deleted;
        });
        const deleted = totalDeleted === total;
        return [
            total,
            !deleted ? () => context.deleteAllKeywords() : null,
            deleted ? () => context.restoreAllKeywords() : null,
        ];
    })();
    
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
                        onDelete={onDeleteAll}
                        onRestore={onRestoreAll}
                    />
                </div>
            </div>
            <div className={style.bubbles}>
                {Object.entries(props.value.keywords).map(([word, value]) => {
                    
                    const [text, onDelete, onRestore] = (() =>  {
                        if (props.total === 1) {
                            return [
                                value.word,
                                !value.isDeleted ? () => context.deleteKeywordForFile(props.value.id, value.word) : null,
                                value.isDeleted ? () => context.restoreKeywordForFile(props.value.id, value.word) : null,
                            ];
                        }
                        const deleted = value.deleted === value.ids.length;
                        return [
                            `${value.ids.length} | ${word}`,
                            !deleted ? () => context.deleteKeyword(word) : null,
                            deleted ? () => context.restoreKeyword(word) : null,
                        ];
                    })();
                    
                    return (
                        <Buble
                            key={word}
                            text={text}
                            onDelete={onDelete}
                            onRestore={onRestore}
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
    total: PropTypes.number.isRequired,
    value: PropTypes.object.isRequired,
};
