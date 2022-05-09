import React from 'react'
import { formatDistanceToNow, parseISO } from "date-fns";


const TimeAgo = (props) => {
    const {timeStamp} = props
    let timeAgo = ''
    if(timeStamp){
        // if we  have the timestamp
        // we are going to crate a date out of it
        // we get the time period with formatDistanceToNow
        const date = parseISO(timeStamp)
        const timePeriod = formatDistanceToNow(date)
        timeAgo = `${timePeriod} ago`
    }

    return (
        <span title={timeStamp}>
            &nbsp; <i>{timeAgo}</i>
        </span>
    )
}

export default TimeAgo
