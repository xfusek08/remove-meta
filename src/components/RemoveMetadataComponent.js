import React from 'react';
import PropTypes from 'prop-types';
import timeIcon from '../icons/time.svg';
import keywordsIcon from '../icons/keywordsIcon.svg';
import style from './RemoveMetadataComponent.module.scss';
import DeleteBubble from './DeleteBubble';

const metadataTypeDefinitions = {
    timeTaken: {
        label: 'Created Time',
        icon: timeIcon,
    },
    keywords:{
        label: 'Keywords',
        icon: keywordsIcon,
        specialComponent: DeleteKeywordsComponent
    }
};

export default function RemoveMetadataComponent(props) {
    let label = props.typeName;
    let icon = null;
    let Component = null;
    
    if (props.typeName in metadataTypeDefinitions) {
        const definition = metadataTypeDefinitions[props.typeName];
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
        />
    );
}
RemoveMetadataComponent.propTypes = {
    typeName: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    value: PropTypes.any,
};


export function RenderGeneralDeleteMetadataComponent(props) {
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
                <DeleteBubble
                    value={props.value}
                    total={props.total}
                />
            </div>
        </div>
    );
}
RenderGeneralDeleteMetadataComponent.propTypes = {
    icon: PropTypes.string, // TODO: icon component?
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
};


export function DeleteKeywordsComponent(props) {
    return (
        <>DeleteKeywordsComponent</>
    );
}
DeleteKeywordsComponent.propTypes = {
    icon: PropTypes.string, // TODO: icon component?
    label: PropTypes.string.isRequired,
    value: PropTypes.arrayOf(String).isRequired,
};