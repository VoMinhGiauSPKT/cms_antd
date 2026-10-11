import axios from 'axios';
import { getData } from '@utils/localStorage';
import { storageKeys } from '@constants';
import { showErrorMessage, showSuccessMessage } from '@services/notifyService';

export const exportExcelFile = async ({ url, fileName }) => {
    try {
        const userAccessToken = getData(storageKeys.USER_ACCESS_TOKEN);
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'blob',
            headers: {
                Authorization: `Bearer ${userAccessToken}`,
            },
        });

        const excelBlob = new Blob([response.data], {
            type: response.headers['content-type'] || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(excelBlob);
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(link.href);

        showSuccessMessage('Xuất file Excel thành công!');
        return true;
    } catch (error) {
        showErrorMessage('Xuất file Excel thất bại!');
        return false;
    }
};
