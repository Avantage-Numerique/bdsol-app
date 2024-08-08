
if (typeof String.prototype.capitalize !== 'function') {
    Object.defineProperty(String.prototype, 'capitalize', {
        value: function () {
            return this.charAt(0).toUpperCase() + this.slice(1);
        },
        enumerable: false
    });
}
if (typeof String.prototype.startWidth !== 'function') {
    Object.defineProperty(String.prototype, 'startWidth', {
        value: function (needle) {
            return this.substring(0, needle.length) === needle;
        },
        enumerable: false
    });
}