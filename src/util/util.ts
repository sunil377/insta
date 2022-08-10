import { formatDistance, formatDistanceStrict } from 'date-fns'
import { Timestamp } from 'firebase/firestore'

const callAll =
  (...fns: any) =>
  (...arg: any) =>
    fns.forEach((fn: any) => fn?.(...arg))

const formatDate = (arg: Timestamp, prefix = false) =>
  formatDistance(arg.toDate(), new Date(), { addSuffix: prefix })

const formatDateStrict = (arg: Timestamp, prefix = false) =>
  formatDistanceStrict(arg.toDate(), new Date())

export { callAll, formatDate, formatDateStrict }
