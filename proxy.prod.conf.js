module.exports = {
    '/api': {
        "target": "http://recipe-server-spring.herokuapp.com",
        "secure": false,
        "pathRewrite": {
          "^/api": ""
        }
    }
}