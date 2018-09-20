const questionsList = {
    '5': '3 + 2',
    '15': '5 * 3',
    '3': '14 - 11',
    '4': '6 - 2'
};

const page = (req, res) => {
    return res.render('verification');
};

const question = (req, res) => {
    const questionsListKeys = Object.keys(questionsList);
    const getKey = Math.floor(Math.random() * (questionsListKeys.length - 1 ));

    req.user.qAnswer = questionsListKeys[getKey];

    req.user.save().then(() => {
        return res.send(questionsList[questionsListKeys[getKey]]);
    });
};

const answer = (req, res) => {
    if (req.user.qAnswer === req.body.answer) {
        req.user.verified = true;
    }

    req.user.save().then(() => {
       return res.redirect('/profile/me');
    });
};

export {
    page,
    question,
    answer
};