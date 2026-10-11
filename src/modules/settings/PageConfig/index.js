import React, { useEffect, useState } from 'react';
import { Col, Row, Button, Input, Select, Modal, Form, Space, Spin } from 'antd';
import { PlusOutlined, SaveOutlined, DeleteOutlined, LeftOutlined } from '@ant-design/icons';
import CropImageField from '@components/common/form/CropImageField';
import DefaultAvatar from '@assets/images/avatar-default.png';
import apiConfig from '@constants/apiConfig';
import { AppConstants } from '@constants';
import useFetch from '@hooks/useFetch';
import { showErrorMessage, showSuccessMessage } from '@services/notifyService';
import { typeActionOptions, TYPE_ACTION_URL } from '@constants/masterData';

const { TextArea } = Input;


const PageConfigPage = () => {
    const [settingRaw, setSettingRaw] = useState(null);

    // 1. Mảng danh sách slider
    const [sliderList, setSliderList] = useState([
        {
            image: '',
            title: '',
            description: '',
            typeAction: TYPE_ACTION_URL,
            url: '',
        },
    ]);
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    // 2. Video và giới thiệu
    const [videoUrl, setVideoUrl] = useState('');
    const [introData, setIntroData] = useState({
        title: '',
        description: '',
    });

    // API lấy dữ liệu: GET /v1/setting/find-by-key?keyNames=page_config
    const { execute: executeGetByKey, loading: loadingGet } = useFetch(apiConfig.settings.getByKey, {
        immediate: false,
    });

    // API upload hình ảnh
    const { execute: executeUpFile } = useFetch(apiConfig.file.upload, { immediate: false });

    // API cập nhật: PUT /v1/setting/update
    const { execute: executeUpdate, loading: saving } = useFetch(apiConfig.settings.update, {
        immediate: false,
    });

    // API tạo mới: POST /v1/setting/create
    const { execute: executeCreate } = useFetch(apiConfig.settings.create, { immediate: false });

    useEffect(() => {
        executeGetByKey({
            params: {
                keyNames: 'page_config',
            },
            onCompleted: (res) => {
                const item = Array.isArray(res?.data) ? res.data[0] : res?.data;
                if (item) {
                    setSettingRaw(item);
                    try {
                        const parsed = typeof item.valueData === 'string' ? JSON.parse(item.valueData) : item.valueData;
                        if (parsed) {
                            if (Array.isArray(parsed.slider) && parsed.slider.length > 0) {
                                setSliderList(
                                    parsed.slider.map((s) => ({
                                        image: s.image || '',
                                        title: s.title || '',
                                        description: s.description || '',
                                        typeAction: s.typeAction !== undefined ? s.typeAction : TYPE_ACTION_URL,
                                        url: s.url || '',
                                    })),
                                );
                            }

                            setVideoUrl(parsed.video || '');

                            if (parsed.description) {
                                setIntroData({
                                    title: parsed.description.title || '',
                                    description: parsed.description.description || '',
                                });
                            }
                        }
                    } catch (e) {
                        console.error('Lỗi parse valueData:', e);
                    }
                }
            },
        });
    }, [executeGetByKey]);

    const currentSlide = sliderList[activeSlideIndex] || {};

    const handleSlideFieldChange = (field, value) => {
        setSliderList((prev) => {
            const next = [...prev];
            next[activeSlideIndex] = {
                ...next[activeSlideIndex],
                [field]: value,
            };
            return next;
        });
    };

    const uploadFile = (file, onSuccess, onError) => {
        executeUpFile({
            data: {
                type: 'AVATAR',
                file: file,
            },
            onCompleted: (response) => {
                if (response.result === true) {
                    onSuccess();
                    handleSlideFieldChange('image', response.data.filePath);
                    showSuccessMessage('Upload ảnh thành công!');
                }
            },
            onError: () => {
                showErrorMessage('Upload ảnh thất bại!');
                onError();
            },
        });
    };

    const handleAddSlide = () => {
        setSliderList((prev) => [
            ...prev,
            {
                image: '',
                title: '',
                description: '',
                typeAction: TYPE_ACTION_URL,
                url: '',
            },
        ]);
        setActiveSlideIndex(sliderList.length);
    };

    const handleDeleteSlide = () => {
        if (sliderList.length <= 1) {
            showErrorMessage('Phải giữ lại ít nhất 1 slide!');
            return;
        }

        Modal.confirm({
            title: 'Bạn có chắc chắn muốn xóa slide này không?',
            okText: 'Có',
            cancelText: 'Không',
            centered: true,
            onOk: () => {
                setSliderList((prev) => prev.filter((_, idx) => idx !== activeSlideIndex));
                setActiveSlideIndex((prev) => Math.max(0, prev - 1));
                showSuccessMessage('Xóa slide thành công!');
            },
        });
    };

    const handleSave = () => {
        const payloadValueData = {
            slider: sliderList,
            video: videoUrl,
            description: {
                title: introData.title,
                description: introData.description,
            },
        };

        const jsonValueData = JSON.stringify(payloadValueData);

        if (settingRaw?.id) {
            executeUpdate({
                data: {
                    id: settingRaw.id,
                    groupName: settingRaw.groupName || 'page_config',
                    keyName: 'page_config',
                    description: settingRaw.description || 'Page configuration settings',
                    dataType: settingRaw.dataType || 'string',
                    isSystem: settingRaw.isSystem !== undefined ? settingRaw.isSystem : false,
                    status: settingRaw.status !== undefined ? settingRaw.status : 1,
                    valueData: jsonValueData,
                },
                onCompleted: () => {
                    showSuccessMessage('Cập nhật cài đặt thành công!');
                },
                onError: (err) => {
                    showErrorMessage(err?.message || 'Cập nhật cài đặt thất bại!');
                },
            });
        } else {
            executeCreate({
                data: {
                    groupName: 'page_config',
                    description: 'Page configuration settings',
                    keyName: 'page_config',
                    dataType: 'string',
                    isSystem: false,
                    valueData: jsonValueData,
                },
                onCompleted: (res) => {
                    setSettingRaw(res?.data);
                    showSuccessMessage('Tạo mới cài đặt thành công!');
                },
                onError: (err) => {
                    showErrorMessage(err?.message || 'Tạo mới cài đặt thất bại!');
                },
            });
        }
    };

    const displayImageUrl = currentSlide.image
        ? currentSlide.image.startsWith('http')
            ? currentSlide.image
            : `${AppConstants.contentRootUrl}${currentSlide.image}`
        : DefaultAvatar;

    return (
        <Spin spinning={loadingGet}>
            <div style={{ paddingTop: 16 }}>
                <Form layout="vertical">
                    {/* khung*/}
                    <div
                        style={{
                            border: '1px solid #d9d9d9',
                            borderRadius: 8,
                            padding: 16,
                            marginBottom: 16,
                        }}
                    >
                        <Row justify="end" style={{ marginBottom: 12 }}>
                            <Button
                                danger
                                icon={<DeleteOutlined />}
                                onClick={handleDeleteSlide}
                            />
                        </Row>

                        <Form.Item label="Ảnh">
                            <CropImageField
                                name="image"
                                imageUrl={displayImageUrl}
                                aspect={16 / 9}
                                uploadFile={uploadFile}
                            />
                        </Form.Item>

                        <Form.Item label="Tiêu đề">
                            <Input
                                placeholder="Tiêu đề slide"
                                value={currentSlide.title || ''}
                                onChange={(e) => handleSlideFieldChange('title', e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item label="Mô tả">
                            <TextArea
                                rows={5}
                                placeholder="Mô tả nội dung"
                                value={currentSlide.description || ''}
                                onChange={(e) => handleSlideFieldChange('description', e.target.value)}
                            />
                        </Form.Item>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Loại hành động">
                                    <Select
                                        style={{ width: '100%' }}
                                        options={typeActionOptions}
                                        value={currentSlide.typeAction || TYPE_ACTION_URL}
                                        onChange={(val) => handleSlideFieldChange('typeAction', val)}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Đường dẫn">
                                    <Input
                                        placeholder="https://..."
                                        value={currentSlide.url || ''}
                                        onChange={(e) => handleSlideFieldChange('url', e.target.value)}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>

                    {/* chuyen trang */}
                    <Row justify="center" style={{ margin: '20px 0 28px' }}>
                        <Space size="middle">
                            <Button
                                size="small"
                                type="text"
                                disabled={activeSlideIndex === 0}
                                icon={<LeftOutlined />}
                                onClick={() => setActiveSlideIndex((prev) => prev - 1)}
                            />
                            {sliderList.map((_, index) => (
                                <Button
                                    key={index}
                                    size="small"
                                    type={activeSlideIndex === index ? 'default' : 'text'}
                                    onClick={() => setActiveSlideIndex(index)}
                                    style={
                                        activeSlideIndex === index
                                            ? { borderColor: '#1890ff', color: '#1890ff' }
                                            : {}
                                    }
                                >
                                    {index + 1}
                                </Button>
                            ))}
                            <Button
                                size="small"
                                type="text"
                                icon={<PlusOutlined />}
                                onClick={handleAddSlide}
                            />
                        </Space>
                    </Row>

                    {/* vieo, gioi thieu */}
                    <Form.Item label="Video">
                        <Input
                            placeholder="https://youtu.be/..."
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item label="Tiêu đề">
                        <Input
                            placeholder="Tiêu đề video"
                            value={introData.title}
                            onChange={(e) => setIntroData((prev) => ({ ...prev, title: e.target.value }))}
                        />
                    </Form.Item>

                    <Form.Item label="Mô tả">
                        <TextArea
                            rows={6}
                            placeholder="Nội dung mô tả video"
                            value={introData.description}
                            onChange={(e) =>
                                setIntroData((prev) => ({ ...prev, description: e.target.value }))
                            }
                        />
                    </Form.Item>

                    {/* cap nhat */}
                    <Row justify="end" style={{ marginTop: 24 }}>
                        <Button
                            type="primary"
                            icon={<SaveOutlined />}
                            loading={saving}
                            onClick={handleSave}
                            style={{ minWidth: 120 }}
                        >
                            Cập nhật
                        </Button>
                    </Row>
                </Form>
            </div>
        </Spin>
    );
};

export default PageConfigPage;
