import upload from '../../helpers/upload';

const page = (req, res) => {
  return res.render('profile', {
      email: req.user.email,
      name: req.user.name,
      img: req.user.img
  });
};

const update = (req, res) => {
    if (!req.body.name) {
        return res.send('empty username');
    }

    req.user.name = req.body.name;

    req.user.save().then((user) => {
       res.json({ user });
    });
};

const updateImg = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.send('image upload error');
        }

        req.user.save().then((user) => {
            return res.send(user)
        });
    })
};

export {
    page,
    update,
    updateImg
};
