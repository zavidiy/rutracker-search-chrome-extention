export enum SortingOrderType {
    REGISTERED = "registered",
    TOPIC_NAME = "topicName",
    NUMBER_OF_DOWNLOADS = "numberOfDownloads",
    NUMBER_OF_SEEDS = "numberOfSeeds",
    NUMBER_OF_LEECHES = "numberOfLeeches",
    SIZE = "size"
}

export type Settings = {
    orderBy?: SortingOrderType
}