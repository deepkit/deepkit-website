

module.exports = function loader(source) {
    return source.replace(/```([a-zA-Z]+)$/g, function(a, b){
         return `<textarea codeHighlight="${b}">`;
    }).replace(/```/g, '</textarea>');
}
