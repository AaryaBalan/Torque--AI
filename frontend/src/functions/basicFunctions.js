// format function to render in react
function formatContent(content) {
    // Set content to an empty string if it’s undefined
    content = content || "";
    // Replace headers
    content = content.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
    content = content.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
    // Replace bold text
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Convert bullet points into list items
    content = content.replace(/^\* (.*?)$/gm, '<li>$1</li>');
    // Wrap lists with <ul> tags
    content = content.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');
    // Wrap paragraphs (assuming paragraphs are separated by double line breaks)
    content = content.replace(/(.+?)\n\n/g, '<p>$1</p>');
    return content;
}

// bytes convertor
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}

function formatDate(){
    const date = new Date()
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${date.getDate()}-${months[date.getMonth()-1]}-${date.getFullYear()}`
}

module.exports = {formatBytes, formatContent , formatDate}