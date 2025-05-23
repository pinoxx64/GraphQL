import jwt from 'jsonwebtoken';

export const generateJWT = (uid = '') => {
    console.log('uid' + uid);
    let token = jwt.sign({ uid }, process.env.SECRETORPRIVATEKEY, {
        expiresIn: '4h'
    })
    return token
}