var newMessage = (from, text) => {
    return {
        from,
        text,
        createdAt : new Date().getTime()
    };
}


module.exports = {
    newMessage
}
