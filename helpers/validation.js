const email = (email) => {
    if (email === email.replace(/(([a-zA-Z]+)\,)|(\,[a-zA-Z]+)|([a-zA-Z]+)\(([a-zA-Z,]+)\)/g, '')) {
        return {
            status: true,
            message: 'success'
        }
    }

    return {
        status: false,
        message: 'not valid email address'
    };
};

const password = (password, confirmPass) => {
    if (confirmPass && password !== confirmPass) {
        return {
            status: false,
            message: 'not match with password'
        };
    }

    if (password.length < 3) {
        return {
            status: false,
            message: 'password is to short'
        };
    }

    if (password.length > 16) {
        return {
            status: false,
            message: 'password is to long'
        };
    }

    return {
        status: true,
        message: 'success'
    }
};

export {
    email,
    password
}
