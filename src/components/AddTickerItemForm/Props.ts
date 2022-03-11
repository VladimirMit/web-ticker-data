interface Props {
    createTicker : (name: string, dateFrom: string, dateTo: string) => Promise<void>;
}

export default Props;