export default {
    convertDate: (source='123456') => {
        const date = source.slice(0, 10)
        const time = source.slice (11, 19)
        const fulldate = `${date} ${time}`
        return fulldate
    }
}