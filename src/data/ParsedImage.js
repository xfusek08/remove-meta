/**
 * File with dummy simulation of business logic functions
 * rawData format is the dummy data for now and it will be changed to actual image uploaded data structure
 */

export default function ParsedImage(rawData) {
    this.urlData = rawData.content;
    this.fileName = rawData.name ?? 'unknown name';
    this.dimensions = rawData.dimensions ?? [-1, -1];
    this.metadata = new Metadata(rawData);
}


export function Metadata(rawData) {
    const rawMetadata = {}; // TODO: load actual all metadata contained in image data

    this.parsed = rawData.metadata.parsed; // TODO: process raw metadata and extract those known to the application
    this.raw = rawMetadata;
}

/**
 * @param {Array}  array of Metadata instances
 *
 * NOTE: aggregation of parsed data only for now
 */
export function AggregatedMetadata(metadataArray) {
    
    // ioi = increment or insert
    const ioi = (ident, obj) => {
        if (ident in obj)  {
            obj[ident]++;
        } else {
            obj[ident] = 1;
        }
    };
    
    const aggregateKeyWord = (newKeywords, aggregationSoFar) => {
        newKeywords.forEach((keyword) => ioi(keyword, aggregationSoFar));
        return aggregationSoFar;
    };
    
    const data = {};
    metadataArray.forEach((metadata) => Object.entries(metadata.parsed)
        .forEach(([name, value]) => {
            switch (name) {
            case 'keywords':
                data[name] = aggregateKeyWord(value, data[name] ?? {});
                break;
            default:
                ioi(name, data);
            }
        })
    );
    
    this.total = metadataArray.length;
    this.data = data;
}
