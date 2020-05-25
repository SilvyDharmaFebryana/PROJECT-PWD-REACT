import userType from '../types/user'

const { ON_LOGIN_SUCCESS, ON_LOGIN_FAIL, ON_LOGOUT_SUCCESS, ON_REGISTER_FAIL } = userType

const init_state = {
    id: 0,
    username: "",
    fullName: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    phone: "",
    password: "",
    repPassword: "",
    address: "",
    role: "",
    errMsg: "",
    cookieChecked: false,
};

export default (state = init_state, action) => {
    switch (action.type) {
        case ON_LOGIN_SUCCESS:
            const { username, fullname, role, id, password, cookieChecked, firstName, lastName, phone, address, repPassword, gender, email } = action.payload;
            return {
                ...state,
                username,
                password,
                firstName,
                lastName,
                phone,
                address,
                gender,
                email,
                repPassword,
                role,
                id,
                cookieChecked: true,
            };
        case ON_LOGIN_FAIL:
            return { ...state, errMsg: action.payload, cookieChecked: true };
        case "ON_REGISTER_FAIL":
            return { ...state, errMsg: action.payload, cookieChecked: true };
        case ON_LOGOUT_SUCCESS:
            return { ...init_state, cookieChecked: true };
        case "COOKIE_CHECK":
            return { ...state, cookieChecked: true };
        case "ON_PASSWORD_FAIL":
            return { ...state, errMsg: action.payload, cookieChecked: true };
        default:
            return { ...state };
    }

};
