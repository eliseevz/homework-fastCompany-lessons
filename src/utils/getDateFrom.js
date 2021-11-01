export function getDateFrom(time) {
    console.log(time, ' this is time')
    const diff = new Date().getTime() - time
    if (diff / 1000 / 60 >= 60) {
        if (diff / 1000 / 60 / 60 / 24 < 1) {
            // return "часы. минуты"
            const date = new Date(diff)
            return `${date.getHours()}:${date.getMinutes()}`
        }
        if (diff / 1000 / 60 / 60 / 24 / 365 > 1) {
            const date = new Date(time)
            // return "день месяц год"
            // return `${date.getDay()} ${date.getMonth()} ${date.getFullYear()}`
            return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' } )} ${date.getFullYear()}`
        } else {
            const date = new Date(time)
            // return "День месяц"
            return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`
        }
    } else {
        if (diff / 1000 / 60 <= 1) {
            return "минуту назад"
        }
        if (diff / 1000 / 60 <= 5) {
            return "5 минут назад"
        }
        if (diff / 1000 / 60 <= 10) {
            return "10 минут назад"
        }
        if (diff / 1000 / 60 <= 30) {
            return "30 минут назад"
        }
    }
}