const axios = require('axios')
const dotenv = require("dotenv");
dotenv.config();

exports.handler = function (event, context, callback) {
    const {API_KEY} = process.env
    const ARTIST_MBID = 'bf600e2b-dc2d-4839-a1be-6ebef4087cd0'
    const URL = `https://api.setlist.fm/rest/1.0/artist/${ARTIST_MBID}/setlists`

    // SEND SETLIST RESPONSE
    const send = body => {
        callback(null, {
            body,
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept',
            }
        })
    }

    // PERFORM API CALL
    const getLists = () => {
        const config = {
            headers : {
                Accept: "application/json",
                "x-api-key": API_KEY
            }
        };
        axios.get(URL, config)
            .then(res => send(JSON.stringify(res.data)))
            .catch(e => send(e))
    }

    // MAKE SURE METHOD IS GET
    if (event.httpMethod === 'GET') {
        getLists();
    }
}