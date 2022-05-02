/**
 * File with dummy simulation of business logic functions
 * rawData format is the dummy data for now and it will be changed to actual image uploaded data structure
 */

import formatcoords from 'formatcoords';
import log from 'loglevel';
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
    
    this.restoreKeyword = (keyword) => {
        if (this.parsed.keywords && this.parsed.keywords.includes(keyword)) {
            this.deletedKeywords = this.deletedKeywords.filter((i) => i != keyword);
        }
    };
    
    this.isDeleted = (key) => this.deleted.includes(key);
    
    this.isKeywordDeleted = (keyword) => this.deletedKeywords.includes(keyword);
}

/**
 * @param {Array}  array of Metadata instances
 *
 * NOTE: aggregation of parsed data only for now
 */
export function AggregatedMetadata(fileArray) {
    const data = {};
    
    if (fileArray.length === 1) {
        // single file aggregation
        const file = fileArray[0];
        const metadata = file.metadata;
        Object.entries(metadata.parsed).forEach(([name, value]) => {
            switch (name) {
            case 'keywords':
                data[name] = {
                    keywords: value.map((kw) => ({
                        word: kw,
                        isDeleted: metadata.isKeywordDeleted(kw),
                    })),
                    id: file.id,
                };
                break;
            case 'geolocation':
                data[name] = {
                    content: formatcoords(...value).format(),
                    isDeleted: metadata.isDeleted(name),
                    id: file.id,
                };
                break;
            case 'timeTaken':
                {
                    const dt = new Date(value);
                    data[name] = {
                        content: `${dt.toLocaleDateString()} ${dt.toLocaleTimeString()}`,
                        isDeleted: metadata.isDeleted(name),
                        id: file.id,
                    };
                }
                break;
            default:
                data[name] = {
                    content: value,
                    isDeleted: metadata.isDeleted(name),
                    id: file.id,
                };
            }
        });
    } else if (fileArray.length > 1) {
        const joinIds = (ids, id) => {
            if (ids) {
                ids.push(id);
                return ids.filter((x, pos) => ids.indexOf(x) === pos);
            }
            return [id];
        };
        
        // multiple files aggregation
        fileArray.forEach((file) => Object.entries(file.metadata.parsed)
            .forEach(([name, value]) => {
                switch (name) {
                case 'keywords':
                    {
                        const keywords = data[name]?.keywords ?? {};
                        value.forEach((keyword) => {
                            keywords[keyword] = {
                                deleted: (keywords[keyword]?.deleted ?? 0) + (file.metadata.isKeywordDeleted(keyword) ? 1 : 0),
                                ids: joinIds(keywords[keyword]?.ids, file.id),
                            };
                        });
                        data[name] = {
                            keywords,
                            ids: joinIds(data[name]?.ids, file.id),
                        };
                    }
                    break;
                default:
                    data[name] = {
                        deleted: (data[name]?.deleted ?? 0) + (file.metadata.isDeleted(name) ? 1 : 0),
                        ids: joinIds(data[name]?.ids, file.id),
                    };
                }
            })
        );
    }
    
    this.total = fileArray.length;
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
