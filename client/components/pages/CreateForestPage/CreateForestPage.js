import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import R from 'ramda';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';

import Box from 'react-bulma-companion/lib/Box';
import Button from 'react-bulma-companion/lib/Button';
import Title from 'react-bulma-companion/lib/Title';
import Field from 'react-bulma-companion/lib/Field';
import Control from 'react-bulma-companion/lib/Control';
import Icon from 'react-bulma-companion/lib/Icon';
import Input from 'react-bulma-companion/lib/Input';
import Label from 'react-bulma-companion/lib/Label';
import Help from 'react-bulma-companion/lib/Help';



import useKeyPress from '_hooks/useKeyPress';
import { postCheckUsername } from '_api/users';
import { validateUsername, validatePassword } from '_utils/validation';
import { attemptRegister } from '_thunks/auth';
import PageLayout from "../../organisms/PageLayout";


export default function Register() {
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [usernameMessage, setUsernameMessage] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [usernameAvailable, setUsernameAvailable] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [mycity, setMyCity] = useState('');
    const [forest, setForest] = useState('');
    const [acceptedTerms, setAcceptedTerms] = React.useState(false);



    const checkPassword = (newUsername, newPassword) => {
        const { valid, message } = validatePassword(newUsername, newPassword);

        setPasswordValid(valid);
        setPasswordMessage(message);
    };

    const checkUsername = newUsername => {
        const { valid, message } = validateUsername(newUsername);

        if (valid) {
            setUsernameMessage('Checking username...');
            setUsernameAvailable(false);

            postCheckUsername(newUsername)
                .then(res => {
                    setUsernameAvailable(res.available);
                    setUsernameMessage(res.message);
                })
                .catch(R.identity);
        } else {
            setUsernameAvailable(valid);
            setUsernameMessage(message);
        }
    };

    const updateUsername = newUserName => {
        setUsername(newUserName);
        checkPassword(newUserName, password);
    };

    const handleUsernameChange = e => {
        updateUsername(e.target.value);
        checkUsername(e.target.value);
    };

    const handlePasswordChange = e => {
        setPassword(e.target.value);
        checkPassword(username, e.target.value);
    };

    // const register = () => {
    //   if (usernameAvailable && passwordValid) {
    //     const newUser = {



    const register = async (e) => {

        e.preventDefault();
        {
            const newUser = {
                'username': username,
                'phone_number': phoneNumber,
                'birth_year': birthYear,
                'email_address': email,
                'password': password,
                'city': mycity,
                'forest_id': forest,
                'get_update': acceptedTerms

            };
            console.log(newUser);


            dispatch(attemptRegister(newUser))
                .catch(R.identity);
        }


    };

    useKeyPress('Enter', register);



    const generateYearOptions = () => {
        const arr = [];

        const startYear = 1940;
        const endYear = new Date().getFullYear();

        for (let i = endYear; i >= startYear; i--) {
            arr.push(<option value={i}>{i}</option>);
        }

        return arr;
    };


    return (
        <PageLayout
            treesIcon={false}
            innerPage={true}
            titleStyle={true}
            title="יצירת חורשה"
        >
            <form onSubmit={register}>
                <div dir="rtl">
                    <Box className="register">
                        <div id="box1">
                            <Field className="ageLabel">
                                <Label htmlFor="username">
                                    עיר:
                                </Label>
                            </Field>
                            <select name="mycity"
                                value={mycity}
                                onChange={e => setMyCity(e.target.value)}
                                className="inputStyle" required>
                                <option value="" disabled selected hidden> הקלד/י שם עיר</option>
                                <option value="">אלעד</option><option value="Jerusalem">אחיטוב</option>
                                <option value="Tel aviv">באר שבע</option><option value="">בית שמש</option>
                                <option value="Jerusalem">ג'לג'וליה</option><option value="Tel aviv">חדרה</option>
                                <option value="">טייבה</option><option value="Jerusalem">יד חנה</option>
                                <option value="">ירושלים</option><option value="Jerusalem">כוכב יאיר-צור יגאל</option>
                                <option value="">כפר סבא</option><option value="Jerusalem">להבים</option>
                                <option value="">מגל</option><option value="Jerusalem">מזכרת בתיה</option>
                                <option value="">נהריה</option><option value="Jerusalem">עכו</option>
                                <option value="">עפולה</option><option value="Jerusalem">קדימה-צורן</option>
                                <option value="">רהט</option><option value="Jerusalem">רתמים</option>
                                <option value="">שובל</option>
                            </select>

                            <Field className="forestName" >
                                <Label >
                                    שם חורשה:
                                </Label>
                                <Input dir="rtl"
                                    name="forestName"
                                    placeholder=" הקלד/י שם חורשה" required
                                    color={username ? (usernameAvailable ? 'success' : 'danger') : undefined}
                                    value={username}
                                    type="text"
                                    onChange={handleUsernameChange}
                                />
                            </Field>

                            <Field className="forestName" >
                                <Label >
                                    שם איש קשר רשות המקומית:
                                </Label>
                                <Input dir="rtl"
                                    name="forestName"
                                    placeholder=" הקלד/י שם " required
                                    color={username ? (usernameAvailable ? 'success' : 'danger') : undefined}
                                    value={username}
                                    type="text"
                                    onChange={handleUsernameChange}
                                />
                            </Field>

                            <Field className="phoneLabel">
                                <Label>
                                    מספר טלפון איש קשר ברשות המקומית:
                                </Label>
                            </Field>
                            <Input name="phoneNumber"
                                type="tel"
                                value={phoneNumber}
                                onChange={e => setPhoneNumber(e.target.value)}
                                className="inputStyle" pattern="[0-9]+" placeholder="ספרות בלבד" required
                            />
                        </div>
                        <div>
                            <button id="btn-uploadingFile" type="submit">בחירת קובץ</button>
                        </div>
                        <div>
                            <button id="btn-createForest" type="submit">שמירת שינויים</button>
                        </div>

                    </Box>
                </div >
            </form >
        </PageLayout >
    );
}
