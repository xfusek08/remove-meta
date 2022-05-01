/**
 * File with dummy simulation of business logic functions
 * rawData format is the dummy data for now and it will be changed to actual image uploaded data structure
 */

import ShortUniqueId from 'short-unique-id';
import { MetadataTypeDefinitions } from '../MetadataTypeDefinitions';

const uid = new ShortUniqueId({ length: 10 });
 
export default function ParsedImage(rawData) {
    this.id = uid();
    this.urlData = rawData.content;
    this.fileName = rawData.name ?? 'unknown name';
    this.dimensions = rawData.dimensions ?? [-1, -1];
    this.metadata = new Metadata(rawData);
}

export function Metadata(rawData) {
    const rawMetadata = {}; // TODO: load actual all metadata contained in image data

    this.parsed = rawData.metadata.parsed; // TODO: process raw metadata and extract those known to the application
    this.raw = rawMetadata;
    this.deleted = [];
    this.deletedKeywords = [];
    
    this.getDeletedCount = () => {
        return this.deleted.length + this.deletedKeywords.length;
    };
    
    this.deleteAll = () => {
        this.deleted = Object.keys(this.parsed).filter((k) => k !== 'keywords');
        this.deleteAllKeywords();
    };
    
    this.deleteKey = (key) => {
        if ((key in this.parsed || key in this.raw) && !this.deleted.includes(key)) {
            this.deleted.push(key);
        }
    };
    
    this.restoreKey = (key) => {
        if ((key in this.parsed || key in this.raw) && this.deleted.includes(key)) {
            this.deleted = this.deleted.filter((i) => i != key);
        }
    };
    
    this.deleteAllKeywords = () => {
        if (this.parsed.keywords) {
            this.deletedKeywords = [...this.parsed.keywords];
        }
    };
    
    this.restoreAllKeywords = () => {
        this.deletedKeywords = [];
    };
    
    this.deleteKeyword = (keyword) => {
        if (this.parsed.keywords &&
            this.parsed.keywords.includes(keyword) &&
            !this.deletedKeywords.includes(keyword)
        ) {
            this.deletedKeywords.push(keyword);
        }
    };
    
    this.restoreKeyWord = (keyword) => {
        if (this.parsed.keywords && this.parsed.keywords.includes(keyword)) {
            this.deletedKeywords = this.deletedKeywords.filter((i) => i != keyword);
        }
    };
    
    this.isDeleted = (key) => this.deleted.includes(key);
    
    this.isKeywordDeleted = (keyWord) => this.deletedKeywords.includes(keyWord);
}

/**
 * @param {Array}  array of Metadata instances
 *
 * NOTE: aggregation of parsed data only for now
 */
export function AggregatedMetadata(metadataArray) {
    
    const data = {};
    metadataArray.forEach((metadata) => Object.entries(metadata.parsed)
        .forEach(([name, value]) => {
            switch (name) {
            case 'keywords':
                {
                    const aggregation = data[name] ?? {};
                    value.forEach((keyWord) => {
                        aggregation[keyWord] = {
                            count: (aggregation[keyWord]?.count ?? 0) + 1,
                            deleted: (aggregation[keyWord]?.deleted ?? 0) + (metadata.isKeywordDeleted(keyWord) ? 1 : 0),
                        };
                    });
                    data[name] = aggregation;
                }
                break;
            default:
                data[name] = {
                    count: (data[name]?.count ?? 0) + 1,
                    deleted: (data[name]?.deleted ?? 0) + (metadata.isDeleted(name) ? 1 : 0),
                };
            }
        })
    );
    
    this.total = metadataArray.length;
    this.data = Object.keys(data)
        .sort((k1, k2) => {
            const k1Display = MetadataTypeDefinitions[k1]?.label ?? k1;
            const k2Display = MetadataTypeDefinitions[k2]?.label ?? k2;
            if (k1Display < k2Display) {
                return -1;
            }
            if (k1Display > k2Display) {
                return 1;
            }
            return 0;
        })
        .reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
        }, {});
}
