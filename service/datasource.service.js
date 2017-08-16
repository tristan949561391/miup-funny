//--- import
const HttpRequest = require('request-promise');
const config = require('../conf').ali_api;
const headers = {
    "Authorization": `APPCODE ${config.AppCode}`
};

async function getResponse(options) {
    let response = await HttpRequest(options);
    return await JSON.parse(response);
}


module.exports.api_query_news_type = async () => {
    const options = {
        uri: 'http://jisunews.market.alicloudapi.com/news/channel',
        headers: headers
    };
    const newsChannel = await getResponse(options);
    if (newsChannel.status !== '0') {
        throw new Error('api:' + newsChannel.msg);
    }
    return newsChannel.result;
};

module.exports.api_query_news = async (newsChannel, num, start) => {
    const options = {
        uri: 'http://jisunews.market.alicloudapi.com/news/get?channel=' + encodeURI(newsChannel) + '&num=' + (num || 20) + '&start=' + (start || 0),
        headers: headers
    };
    const newsData = await getResponse(options);
    if (newsData.status !== '0') {
        throw new Error('api:' + newsData.msg);
    }
    return newsData.result;
};

/**
 *
 * @param type 参数名 city,cityid,citycode,ip,location(39.983424,116.322987)
 * @param param 参数值
 * @returns {Promise.<void>}
 */
module.exports.api_query_weather = async (type, param) => {
    const options = {
        uri: 'http://jisutqybmf.market.alicloudapi.com/weather/query?' + type + '=' + param,
        headers: headers
    };
    const response = await HttpRequest(options);
    let weather = await JSON.parse(response);
    if (weather.status === '0') {
        return weather.result;
    } else {
        throw new Error("Error:" + weather.msg)
    }
};


module.exports.api_query_city = async (ip) => {
    const options = {
        uri: 'http://iploc.market.alicloudapi.com/v3/ip?ip=' + ip,
        headers: headers
    };
    const response = await HttpRequest(options);
    let cityData = await JSON.parse(response);
    if (cityData.info === 'OK') {
        return cityData;
    } else {
        throw new Error('Error:find city error');
    }
};