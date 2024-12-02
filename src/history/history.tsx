import { UserHistoryEntry } from "../types"

interface HistoryComponentProps {
    history: UserHistoryEntry[]
}
export const HistoryComponent = ({ history }: HistoryComponentProps) => {

    if (history.length > 0) {
        //todo replace with a d3 thing
        return history.map((historyEntry: UserHistoryEntry) => {

            const smartDate = new Date(historyEntry.timestamp * 1000);
            return <>{smartDate.getMonth()}/{smartDate.getDay()}/{smartDate.getFullYear()}: {historyEntry.didIt ? "You stretched" : "You missed a stretch sesh"}<br></br></>
        })

    }
    return <></>;

}