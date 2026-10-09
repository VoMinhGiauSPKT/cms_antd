import React, { useEffect, useState } from 'react';
import { Layout, Menu, Avatar, Space, Modal, Row, Col, Button, Flex, Typography } from 'antd';
import {
    DownOutlined,
    UserOutlined,
    LoginOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ClearOutlined,
    ExclamationCircleFilled,
} from '@ant-design/icons';
const { Header } = Layout;

import styles from './AppHeader.module.scss';
import useAuth from '@hooks/useAuth';
import { useDispatch } from 'react-redux';
import { accountActions, appActions } from '@store/actions';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import { getCacheAccessToken, removeCacheToken } from '@services/userService';
import { useNavigate } from 'react-router-dom';
import { apiUrl, AppConstants, storageKeys } from '@constants';
import { defineMessages } from 'react-intl';
import useTranslate from '@hooks/useTranslate';
import useLocale from '@hooks/useLocale';
import ModalSession from '@components/common/form/entry/ModalSession';
import useDisclosure from '@hooks/useDisclosure';
import { showErrorMessage, showSuccessMessage } from '@services/notifyService';
import axios from 'axios';
import { sessionStorageWrapper } from '@utils/sessionStorage';
import useValidatePermission from '@hooks/useValidatePermission';
import TextField from '@components/common/form/TextField';
import { commonMessage } from '@locales/intl';
import { BaseForm } from '@components/common/form/BaseForm';
import { useForm } from 'antd/es/form/Form';
import { getData, removeItem } from '@utils/localStorage';
import { GrPowerReset } from 'react-icons/gr';
import { renderImageUrl } from '@utils';
import CheckboxField from '@components/common/form/CheckboxField';

const message = defineMessages({
    profile: 'Profile',
    logout: 'Logout',
    sessionKey: 'Session Key',
    requestKey: 'Request Key',
    locale: '{locale, select, en {Vietnamese} other {English}}',
    clearKey: 'Clear key',
});

const AppHeader = ({ collapsed, onCollapse }) => {
    const { locale } = useLocale();
    const { profile } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { execute: executeClearKey } = useFetch(apiConfig.account.clearKey);
    const { execute: executeResetSystem } = useFetch(apiConfig.management.reset);
    const translate = useTranslate();
    const [openedModal, handlerModal] = useDisclosure(false);
    const userAccessToken = getCacheAccessToken();
    const [openModalRequest, handlersModalRequest] = useDisclosure(false);
    const [password, setPassword] = useState('');

    const [opened, { open, close }] = useDisclosure(false);

    const handleChangeLocale = () => {
        dispatch(appActions.changeLanguage(locale === 'vi' ? 'en' : 'vi'));
    };

    const handleModalOpen = () => {
        handlerModal.open();
    };

    const handleClearKey = () => {
        executeClearKey({
            onCompleted: () => {
                if (profile.isSuperAdmin != true) onLogout();
                else {
                    showSuccessMessage('Clear key successfully !');
                    window.location.reload();
                }
            },
        });
    };

    const handleRequestKey = () => {
        axios({
            url: `${apiUrl}v1/account/request-key`,
            method: 'POST',
            responseType: 'blob',
            headers: {
                Authorization: `Bearer ${userAccessToken}`,
            },
            data: {
                password,
            },
        })
            .then((response) => {
                sessionStorageWrapper.removeItem('sessionKey');

                const excelBlob = new Blob([response.data], {
                    type: response.headers['content-type'],
                });

                const link = document.createElement('a');

                link.href = URL.createObjectURL(excelBlob);
                link.download = `request_session_key.txt`;
                link.click();
                showSuccessMessage('Tạo tệp session key thành công !');
                setPassword('');
                form.resetFields();
                handlersModalRequest.close();
                window.location.reload();
            })
            .catch((error) => {
                showErrorMessage('Tạo tệp session key thất bại !');
                setPassword('');
                form.resetFields();
                handlersModalRequest.close();
            });
    };

    
    const handleResetSystem = async (values) => {
        await executeResetSystem({
            params: values,
            onCompleted: () => {
                showSuccessMessage('Reset thành công', translate);
                close();
                window.location.reload();
            },
            onError: (error) => {
                console.log(error);
                showErrorMessage('Reset thất bại', translate);
            },
        });
    };

    const onLogout = () => {
        sessionStorageWrapper.removeItem('sessionKey');
        removeCacheToken();
        removeItem(storageKeys.BBB_JOIN_LINK);
        removeItem(storageKeys.BBB_PLAY_LINK);
        dispatch(accountActions.logout());
    };

    const { execute: executeUpdateState } = useFetch(apiConfig.notification.changeState, {
        immediate: false,
    });

    const validatePermission = useValidatePermission();

    function makeNavs(navs) {
        return navs.map((nav) => {
            const newNav = { ...nav };
            if (newNav.permission || newNav.kind) {
                if (!validatePermission(newNav.permission)) {
                    return null;
                }
            }
            if (newNav.children) {
                newNav.children = makeNavs(nav.children);
                if (newNav.children.every((item) => item === null)) {
                    return null;
                }
            }

            return newNav;
        });
    }

    const navMenuConfig = [
        {
            key: 'menu',
            label: (
                <Space>
                    <Avatar icon={<UserOutlined />} src={renderImageUrl(profile?.avatarPath)} />
                    {profile?.fullName}
                    <DownOutlined />
                </Space>
            ),
            children: [
                {
                    label: translate.formatMessage(message.profile),
                    icon: <UserOutlined />,
                    key: 'profile',
                    onClick: () => navigate('/profile'),
                },
                {
                    label: translate.formatMessage(message.clearKey),
                    icon: <ClearOutlined />,
                    key: 'clearKey',
                    onClick: handleClearKey,
                    permission: [apiConfig.account.clearKey.baseURL],
                },
                // profile?.isSuperAdmin
                //     ? {
                //           label: 'Reset hệ thống',
                //           icon: <GrPowerReset />,
                //           key: 'reset',
                //           //   onClick: getData(storageKeys.LOGIN_SSO) ? handleResetSystemSSO : open,
                //           onClick: open,
                //       }
                //     : null,
                // {
                //     label: translate.formatMessage(message.requestKey),
                //     icon: <PullRequestOutlined />,
                //     key: 'requestKey',
                //     onClick: () => handlersModalRequest.open(),
                // },
                // {
                //     label: translate.formatMessage(message.locale, { locale }),
                //     key: 'locale',
                //     icon: <TranslationOutlined />,
                //     onClick: handleChangeLocale,
                // },
                {
                    label: translate.formatMessage(message.logout),
                    icon: <LoginOutlined />,
                    key: 'logout',
                    onClick: onLogout,
                },
            ].filter(Boolean),
        },
    ];

    const [form] = useForm();

    useEffect(() => {
        form.setFieldValue('isResetUser', false);
    }, []);

    return (
        <Header className={styles.appHeader} style={{ padding: 0, background: 'white' }}>
            <span className={styles.iconCollapse} onClick={onCollapse}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </span>
            <Menu mode="horizontal" className={styles.rightMenu} selectedKeys={[]} items={makeNavs(navMenuConfig)} />
            <ModalSession open={openedModal} close={() => handlerModal.close()} handlerModal={handlerModal} />
            <Modal
                centered
                open={openModalRequest}
                onCancel={() => handlersModalRequest.close()}
                // footer={null}
                title={'Clear enter your password'}
                width={600}
                styles={{
                    header: { marginBottom: 20 },
                    footer: { marginTop: 0 },
                }}
                onOk={() => handleRequestKey()}
                okButtonProps={{
                    disabled: password == '',
                }}
                cancelButtonProps={{
                    style: { color: '#cf1322', background: '#fff1f0', borderColor: '#ffa39e' },
                }}
            >
                <BaseForm form={form} style={{ width: '100%' }}>
                    <Row gutter={10}>
                        <Col span={24}>
                            <TextField
                                name="password"
                                label={translate.formatMessage(commonMessage.password)}
                                required
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </Col>
                    </Row>
                </BaseForm>
            </Modal>
            <Modal
                width={416}
                closeIcon={null}
                footer={null}
                cancelButtonProps={{ danger: true }}
                onCancel={close}
                open={opened}
            >
                <Typography.Title level={5} style={{ margin: 0, display: 'flex', alignItems: 'start', gap: 10 }}>
                    <ExclamationCircleFilled style={{ color: '#faad14', fontSize: 22 }} />
                    Bạn có chắc chắn muốn reset lại hệ thống không?
                </Typography.Title>
                <BaseForm form={form} style={{ width: '100%' }} onFinish={handleResetSystem}>
                    <Row gutter={10}>
                        <Col span={24}>
                            <CheckboxField
                                name="isResetUser"
                                label="Xóa dữ liệu người dùng"
                                required
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                formItemProps={{
                                    style: {
                                        marginLeft: 30,
                                        marginTop: 10,
                                    },
                                }}
                            />
                        </Col>
                    </Row>
                    <Flex gap={8} justify="end">
                        <Button danger={true} onClick={close}>
                            Không
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Có
                        </Button>
                    </Flex>
                </BaseForm>
            </Modal>
        </Header>
    );
};

export default AppHeader;
