
const localEvent = function (item) {
    this.getLocalStorage = function () {
        return JSON.parse(localStorage.getItem(item))
    }
    this.getCookie = function () {
        let name = item + '='
        let ca = document.cookie.split(';')
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim()
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length)
            }
          }
          return ''
    }
}
export const userLocal = new localEvent('userMsg')
export const cookieLocal = new localEvent('user')