const URL = require('./../models/url.model')
const shortid = require('shortid')

async function handleCreateURL(req, res) {
    const body = req.body;
    const shortId = shortid();
    if(!body.url) return res.status(400).json({status: 'Failed', msg: 'URL is required.'})
    const result = await URL.create({
        shortURL: shortId,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id
    });
    if(result) {
        res.render('home', {
            generatedURL: `${req.host}${req.baseUrl}/${shortId}`,
            userDetails: result
        })
        // res.json({status: 'Success', redirectedURL: `${req.host}${req.baseUrl}/${shortId}`})
    }
}

async function handleRedirectRouteByShortID(req, res) {
    const shortID = req.params.id;
    const result = await URL.findOneAndUpdate({shortURL: shortID}, {
        $push: {
            visitHistory: {
                timeStamp: Date.now()
            }
        }
    });
    res.redirect(result.redirectURL);
}

async function handleAnalytics(req, res) {
    const id = req.params.id;
    const result = await URL.findOne({shortURL: id});
    return res.json({totalClicks: result.visitHistory.length, analytics: result.visitHistory, userDetails: req.host})
}

module.exports = {
    handleCreateURL,
    handleRedirectRouteByShortID,
    handleAnalytics
}