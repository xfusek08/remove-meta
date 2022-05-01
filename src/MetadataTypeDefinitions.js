
import keywordsIcon from './icons/keywordsIcon.svg';
import timeIcon from './icons/time.svg';
import geolocationIcon from './icons/geolocation.svg';
import { DeleteKeywordsComponent } from './components/RemoveMetadataComponent';

export const MetadataTypeDefinitions = {
    timeTaken: {
        label: 'Created Time',
        icon: timeIcon,
    },
    geolocation:{
        label: 'Geolocation',
        icon: geolocationIcon,
    },
    keywords:{
        label: 'Keywords',
        icon: keywordsIcon,
        specialComponent: DeleteKeywordsComponent
    }
};
