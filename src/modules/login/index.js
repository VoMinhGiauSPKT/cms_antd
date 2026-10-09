import React, { useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import loadingImage from '@assets/icons/loading.svg';
import { appAccount, AppConstants, brandName, KIND_ADMIN, loginSsoUrl, storageKeys } from '@constants';
import apiConfig from '@constants/apiConfig';
import useFetch from '@hooks/useFetch';
import useQueryParams from '@hooks/useQueryParams';
import useTranslate from '@hooks/useTranslate';
import { commonMessage } from '@locales/intl';
import { showErrorMessage } from '@services/notifyService';
import { getCacheAccessToken, removeCacheToken, setCacheAccessToken } from '@services/userService';
import { accountActions, appActions } from '@store/actions';
import { setData } from '@utils/localStorage';
import { Buffer } from 'buffer';
import { useDispatch } from 'react-redux';
import styles from './index.module.scss';

import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons'

const { secretId, appId, userKind } = AppConstants;
window.Buffer = window.Buffer || Buffer;
const message = defineMessages({
    copyRight: '{brandName} - © Copyright {year}. All Rights Reserved',
    loginFail: 'Wrong password!',
    loginOtpFail: 'Invalid OTP!',
    loginSuccess: 'Đăng nhập thành công !',
    verify: 'Xác nhận',
    cancel: 'Hủy',
    verifyFailOTP: 'TOTP verification failed!',
    verifySuccessOTP: 'Xác thực OTP thành công!!!',
    loginNoAccess: 'Loại tài khoản không phù hợp!!!',
    username: 'Username',
    otp: 'OTP',
    password: 'Password',
    ERROR_ACCOUNT_0015: 'Không thể login sso',
    loginMfaFail: 'Đăng nhập MFA thất bại!!!',
});

const LoginPage = () => {
    const intl = useIntl();
    const translate = useTranslate();
    const dispatch = useDispatch();
    const userAccessToken = getCacheAccessToken();
    const { params } = useQueryParams();
    const hashCache = params.get('hash');
    const paramInit = new URLSearchParams({
        appId,
        userKind: userKind,
        secretId,
        callbackUrl: window.location.href,
        appName: brandName,
    }).toString();
    const redirectUrl = `${loginSsoUrl}?${paramInit}`;

    const base64Credentials = Buffer.from(`${appAccount.APP_USERNAME}:${appAccount.APP_PASSWORD}`).toString('base64');
    const { execute: executeToken, loading } = useFetch({
        ...apiConfig.account.loginBasic,
        authorization: `Basic ${base64Credentials}`,
    });
    const { execute: executeGetProfile } = useFetch(apiConfig.account.getProfile, {
        immediate: false,
    });
    const onLogin = (values) => {

        executeToken({
            data: {
                username: values.username,
                password: values.password,
                grant_type: "password",
            },
            onCompleted: (responeLogin) => {
                handleLoginSuccess(responeLogin);
            },
            onError: () => showErrorMessage(translate.formatMessage(message.loginFail)),
        })

        // executeToken({
        //     data: {
        //         hash: values,
        //         grant_type: 'open_id',
        //         secretId,
        //         appId,
        //         userKind: userKind,
        //     },
        //     onCompleted: (responeLogin) => {
        //         handleLoginSuccess(responeLogin);
        //     },
        //     onError: () => showErrorMessage(translate.formatMessage(message.loginFail)),
        // });
    };

    useEffect(() => {
        const handleChangeLocale = () => {
            dispatch(appActions.changeLanguage('vi'));
        };
        handleChangeLocale();

        const handleRemoveCache = (event) => {
            //check bf cache
            if (event.persisted) {
                console.log('remove cache');
                window.location.reload();
            }
        };

        window.addEventListener('pageshow', handleRemoveCache);

        return () => window.removeEventListener('pageshow', handleRemoveCache);
    }, []);

    useEffect(() => {
        // if (!userAccessToken && !hashCache) {
        //     setTimeout(() => {
        //         window.location.href = redirectUrl;
        //     }, [900]);
        // } else if (hashCache) {
        //     const safeHash = decodeURIComponent(hashCache);
        //     onLogin(safeHash);
        // }
        if (hashCache) {
            const safeHash = decodeURIComponent(hashCache);
            onLogin(safeHash);
        }
    }, [hashCache]);

    const handleLoginSuccess = (res) => {
        console.log('1. Lấy token đăng nhập thành công:', res);
        setCacheAccessToken(res.access_token);
        setData(storageKeys.USER_KIND, res.user_kind || KIND_ADMIN);
        executeGetProfile({
            onCompleted: (res) => {
                dispatch(accountActions.getProfileSuccess(res));
                console.log('2. Lấy thông tin profile thành công:', res);
            },
            onError: (err) => {
                console.log('err', err);
                // removeCacheToken();
                // window.location.href = redirectUrl;
            },
        });
    };

    return (
        <div className={styles.loginPage}>
            {/* <img alt="not-found-background" src={loadingImage} className={styles.img} />
            <span className={styles.textItalic}>{intl.formatMessage(commonMessage.redirecting)}</span> */}
            <div className={styles.loginForm}>
                <h3 style={{ textAlign: 'center', marginBottom: 24 }}>ĐĂNG NHẬP</h3>
                <Form onFinish={onLogin} layout="vertical">
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: "vui lòng nhập tên đăng nhập" }]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder='Tên đăng nhập'
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: "vui lòng nhập mật khẩu" }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder='Mật khẩu'
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type='primary'
                            htmlType='submit'
                            size="large"
                            loading={loading}
                            block
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
                <div style={{ textAlign: 'center', fontSize: 12, marginTop: 16 }}>
                    Copyright © RoView, All Rights Reserved.
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
