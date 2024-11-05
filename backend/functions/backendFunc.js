function formatDate() {
    const date = new Date()
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${date.getDate()}-${months[date.getMonth() - 1]}-${date.getFullYear()}`
}

module.exports = {formatDate}