export const sortDataByProperty = (array, prop) => {
    return array.sort((a, b) => a[prop].localeCompare(b[prop]))
}