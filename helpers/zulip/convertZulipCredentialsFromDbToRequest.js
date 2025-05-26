function convertZulipCredentialsFromDbToRequest({api_key, username, realm}) {
    return {
        apiKey: api_key,
        username: username,
        realm: realm,
    }
}

module.exports = convertZulipCredentialsFromDbToRequest