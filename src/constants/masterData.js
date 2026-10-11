import {
    STATUS_ACTIVE,
    STATUS_INACTIVE,
    STATUS_PENDING,
    PROVINCE_KIND,
    DISTRICT_KIND,
    VILLAGE_KIND,
    CATEGORY_KIND_INCOME,
    CATEGORY_KIND_EXPENDITURE,
    TRANSACTION_STATE_CREATED,
    TRANSACTION_STATE_APPROVE,
    TRANSACTION_STATE_REJECT,
    TRANSACTION_STATE_PAID,
    SERVICE_PERIOD_KIND_FIX_DAY,
    SERVICE_PERIOD_KIND_MONTH,
    SERVICE_PERIOD_KIND_YEAR,
    KEY_KIND_SERVER,
    KEY_KIND_GOOGLE,
    DEFAULT_FORMAT_ZERO,
    DEFAULT_FORMAT_ZERO_SECOND,
    DEFAULT_FORMAT,
    DATE_DISPLAY_FORMAT,
    DEFAULT_FORMAT_BASIC,
    DATE_FORMAT_BASIC,
    DATE_SHORT_MONTH_FORMAT,
    DATE_FORMAT_VALUE,
    PAYMENT_PERIOD_STATE_CREATED,
    PAYMENT_PERIOD_STATE_PAID,
    TASK_PENDING,
    TASK_DONE,
    KIND_ADMIN,
    KIND_CUSTOMER,
    LECTURE_SECTION,
    LECTURE_LESSION,
    LECTURE_VIDEO,
    LECTURE_STATE_INIT,
    LECTURE_STATE_PROCESSED,
    KIND_ACCOUNT_PRIVATE,
    KIND_ACCOUNT_GROUP,
    ROLE_ADMIN,
    MEETING_ROOM_STATE_RUNNING,
    MEETING_ROOM_STATE_ENDED,
    MEETING_ROOM_PUBLIC,
    MEETING_ROOM_PRIVATE,
    ROLE_GUEST,
    TAG_UNIMPORTANT,
    TAG_IMPORTANT,
    FILE_KIND_SYSTEM,
    FILE_KIND_PRESENTATION,
    FILE_KIND_DEFAULT,
    FILE_KIND_AVATAR,
    STATUS_DELETE,
} from '@constants';
import { defineMessages } from 'react-intl';
import { actionMessage, lectureKindMessage, nationKindMessage, lectureStateMessage } from './intl';
import { IconLock, IconWorld } from '@tabler/icons-react';

const commonMessage = defineMessages({
    statusActive: 'Hoạt động',
    statusLock: 'Khóa',
    statusPending: 'Đang chờ',
    statusInactive: 'Không hoạt động',
    statusDelete: 'Đã xóa',
    income: 'Thu',
    expenditure: 'Chi',
    superAdmin: 'Super Admin',
    admin: 'Admin',
    customer: 'Customer',
    member: 'Member',
    user: 'User',
    account: 'Tài khoản',
    accountGroup: 'Nhóm tài khoản',
    meeting: 'Đang họp',
    idle: 'Đã kết thúc',
    public: 'Công khai',
    private: 'Riêng tư',
    guest: 'Khách',
    moderator: 'Moderator',
    unimportant: 'Không quan trọng',
    important: 'Quan trọng',
});

const transactionStateMessage = defineMessages({
    created: 'Đã tạo',
    approve: 'Chấp nhận',
    reject: 'Từ chối',
    paid: 'Thanh toán',
});

const taskStateMessage = defineMessages({
    pending: 'Đang xử lý',
    done: 'Đã hoàn thành',
});

const paymentStateMessage = defineMessages({
    created: 'Đã tạo',
    approve: 'Đã duyệt',
    paid: 'Thanh toán',
});

const periodKindMessage = defineMessages({
    day: 'Ngày cố định',
    month: 'Theo tháng',
    year: 'Theo năm',
});

const keyKindMessage = defineMessages({
    server: 'Server',
    google: 'Web',
});

export const languageOptions = [
    { value: 1, label: 'EN' },
    { value: 2, label: 'VN' },
    { value: 3, label: 'Other' },
];

export const orderOptions = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
];

export const kindOption = [
    { value: 1, label: 'ADMIN' },
    { value: 2, label: 'MODERATOR' },
    { value: 3, label: 'STUDENT' },
    // { value: 4, label: 'INTERNAL' },
    // { value: 5, label: 'COMPANY ' },
];

export const commonStatus = [
    { value: STATUS_ACTIVE, label: 'Active', color: 'green' },
    { value: STATUS_PENDING, label: 'Pending', color: 'warning' },
    { value: STATUS_INACTIVE, label: 'Inactive', color: 'red' },
];

export const statusOptions = [
    { value: STATUS_ACTIVE, label: commonMessage.statusActive, color: '#00A648' },
    { value: STATUS_PENDING, label: commonMessage.statusPending, color: '#FFBF00' },
    { value: STATUS_INACTIVE, label: commonMessage.statusInactive, color: '#CC0000' },
];

export const statusUserOptions = [
    { value: STATUS_ACTIVE, label: commonMessage.statusActive, color: '#00A648' },
    { value: STATUS_INACTIVE, label: commonMessage.statusLock, color: '#CC0000' },
];

export const formSize = {
    small: '700px',
    normal: '800px',
    big: '900px',
    bigXl: '1200px',
    full: '70vw',
};

export const nationKindOptions = [
    {
        value: PROVINCE_KIND,
        label: nationKindMessage.province,
    },
    {
        value: DISTRICT_KIND,
        label: nationKindMessage.district,
    },
    {
        value: VILLAGE_KIND,
        label: nationKindMessage.village,
    },
];

export const kindOptions = [
    { value: CATEGORY_KIND_INCOME, label: commonMessage.income, color: '#00A648' },
    { value: CATEGORY_KIND_EXPENDITURE, label: commonMessage.expenditure, color: '#FFBF00' },
];

export const kindPeriodOptions = [
    { value: SERVICE_PERIOD_KIND_FIX_DAY, label: periodKindMessage.day, color: '#00A648' },
    { value: SERVICE_PERIOD_KIND_MONTH, label: periodKindMessage.month, color: 'blue' },
    { value: SERVICE_PERIOD_KIND_YEAR, label: periodKindMessage.year, color: '#14CEEC' },
];

export const kindKeyOptions = [
    { value: KEY_KIND_SERVER, label: keyKindMessage.server, color: '#4285f4' },
    { value: KEY_KIND_GOOGLE, label: keyKindMessage.google, color: '#fbbc05' },
];

export const stateTransactionOptions = [
    { value: TRANSACTION_STATE_CREATED, label: transactionStateMessage.created, color: 'yellow' },
    { value: TRANSACTION_STATE_APPROVE, label: transactionStateMessage.approve, color: 'blue' },
    { value: TRANSACTION_STATE_REJECT, label: transactionStateMessage.reject, color: 'red' },
    { value: TRANSACTION_STATE_PAID, label: transactionStateMessage.paid, color: 'green' },
];

export const statePaymentPeriodOptions = [
    { value: PAYMENT_PERIOD_STATE_CREATED, label: paymentStateMessage.created, color: 'yellow' },
    { value: PAYMENT_PERIOD_STATE_PAID, label: paymentStateMessage.approve, color: 'blue' },
    { value: TRANSACTION_STATE_PAID, label: paymentStateMessage.paid, color: 'green' },
];

export const ssoStatusOptions = [
    { value: STATUS_ACTIVE, label: commonMessage.statusActive, color: '#00A648' },
    { value: STATUS_INACTIVE, label: commonMessage.statusInactive, color: '#CC0000' },
    { value: STATUS_DELETE, label: commonMessage.statusDelete, color: '#CC0000' },
];

export const settingGroups = {
    GENERAL: 'general',
    PAGE: 'page_config',
    REVENUE: 'revenue_config',
    TRAINING: 'training_config',
    BBB: 'bbb_config',
};

export const dataTypeSetting = {
    INT: 'int',
    STRING: 'string',
    BOOLEAN: 'boolean',
    DOUBLE: 'double',
    RICHTEXT: 'richtext',
    DATE: 'date',
    SELECT: 'select',
    UPLOAD: 'upload',
};

export const settingKeyName = {
    MONEY_UNIT: 'money_unit',
    DATE_UNIT: 'date_format',
    DATE_TIME_UNIT: 'date_time_format',
    DECIMAL_SEPARATOR: 'decimal_separator',
    GROUP_SEPARATOR: 'group_separator',
};

export const actionOptions = [
    {
        value: 1,
        label: actionMessage.contactForm,
    },
    { value: 2, label: actionMessage.navigation },
];

export const dateTimeOptions = [
    { value: DEFAULT_FORMAT_BASIC, label: DEFAULT_FORMAT_BASIC },
    { value: DATE_DISPLAY_FORMAT, label: DATE_DISPLAY_FORMAT },
    { value: DEFAULT_FORMAT, label: DEFAULT_FORMAT },
    { value: DEFAULT_FORMAT_ZERO_SECOND, label: DEFAULT_FORMAT_ZERO_SECOND },
    { value: DEFAULT_FORMAT_ZERO, label: DEFAULT_FORMAT_ZERO },
];

export const dateOptions = [
    { value: DATE_FORMAT_BASIC, label: DATE_FORMAT_BASIC },
    { value: DATE_FORMAT_VALUE, label: DATE_FORMAT_VALUE },
    { value: DATE_SHORT_MONTH_FORMAT, label: DATE_SHORT_MONTH_FORMAT },
];

export const stateTaskOptions = [
    { value: TASK_PENDING, label: taskStateMessage.pending, color: 'yellow' },
    { value: TASK_DONE, label: taskStateMessage.done, color: 'green' },
];

export const kindRoleOptions = [
    { value: KIND_ADMIN, label: commonMessage.admin, color: 'blue' },
    { value: KIND_CUSTOMER, label: commonMessage.user, color: 'green' },
];

export const lectureKindOptions = [
    {
        value: LECTURE_SECTION,
        label: lectureKindMessage.chapter,
        color: 'blue',
    },
    // {
    //     value: LECTURE_LESSION,
    //     label: lectureKindMessage.lesson,
    //     color: 'green',
    // },
    {
        value: LECTURE_VIDEO,
        label: lectureKindMessage.video,
        color: '#FFBF00',
    },
];

export const lectureStateOptions = [
    {
        value: LECTURE_STATE_INIT,
        lable: lectureStateMessage.init,
        color: 'red',
    },
    {
        value: LECTURE_STATE_PROCESSED,
        lable: lectureStateMessage.processed,
        color: 'green',
    },
];

export const kindGroupAccountOptions = [
    { value: KIND_ACCOUNT_GROUP, label: commonMessage.account, color: '#00A648' },
    { value: KIND_ACCOUNT_PRIVATE, label: commonMessage.accountGroup, color: '#FFBF00' },
];

export const roleTypes = [
    {
        value: ROLE_ADMIN,
        label: commonMessage.superAdmin,
        isSuperAdmin: true,
        color: 'green',
    },
    {
        value: ROLE_ADMIN,
        label: commonMessage.admin,
        isSuperAdmin: false,
        color: 'blue',
    },
    {
        value: ROLE_GUEST,
        label: commonMessage.guest,
        color: 'purple',
    },
];

export const meetingRoomStates = [
    {
        value: MEETING_ROOM_STATE_RUNNING,
        label: commonMessage.meeting,
    },
    {
        value: MEETING_ROOM_STATE_ENDED,
        label: commonMessage.idle,
    },
];

export const roomTypes = [
    {
        value: MEETING_ROOM_PUBLIC,
        label: commonMessage.public,
        icon: IconWorld,
        color: 'blue',
    },
    {
        value: MEETING_ROOM_PRIVATE,
        label: commonMessage.private,
        icon: IconLock,
        color: 'red',
    },
];

export const daysTimeLabel = [{ label: commonMessage.morning }, { label: commonMessage.afternoon }];

export const dayOfWeek = defineMessages({
    monday: 'Thứ 2',
    tuesday: 'Thứ 3',
    wednesday: 'Thứ 4',
    thursday: 'Thứ 5',
    friday: 'Thứ 6',
    saturday: 'Thứ 7',
    sunday: 'Chủ nhật',
});

export const daysOfWeekSchedule = [
    { value: 'monday', label: dayOfWeek.monday },
    { value: 'tuesday', label: dayOfWeek.tuesday },
    { value: 'wednesday', label: dayOfWeek.wednesday },
    { value: 'thursday', label: dayOfWeek.thursday },
    { value: 'friday', label: dayOfWeek.friday },
    { value: 'saturday', label: dayOfWeek.saturday },
    { value: 'sunday', label: dayOfWeek.sunday },
];

export const settingKeysOptions = {
    ALLOW_ANONYMOUS: 'allowAnonymous',
};

export const groupPermissionKinds = [
    {
        value: ROLE_ADMIN,
        label: commonMessage.admin,
    },
];

export const tagImportantKinds = [
    {
        value: TAG_UNIMPORTANT,
        label: commonMessage.unimportant,
    },
    {
        value: TAG_IMPORTANT,
        label: commonMessage.important,
    },
];

export const FILE_KIND = {
    FILE_KIND_SYSTEM,
    FILE_KIND_PRESENTATION,
    FILE_KIND_DEFAULT,
    FILE_KIND_AVATAR,
};

export const CLASSROOM_STATE_CREATED = 0;
export const CLASSROOM_STATE_LEARNING = 1;
export const CLASSROOM_STATE_FINISHED = 2;
export const CLASSROOM_STATE_CANCELED = 3;

export const stateClassroomOptions = [
    { value: CLASSROOM_STATE_CREATED, label: 'Đang tạo', color: 'orange' },
    { value: CLASSROOM_STATE_LEARNING, label: 'Đang học', color: 'green' },
    { value: CLASSROOM_STATE_FINISHED, label: 'Đã kết thúc', color: 'blue' },
    { value: CLASSROOM_STATE_CANCELED, label: 'Đã hủy', color: 'red' },
];


export const CLASSROOM_STUDENT_STATE_PENDING = 0;
export const CLASSROOM_STUDENT_STATE_APPROVE = 1;
export const CLASSROOM_STUDENT_STATE_REJECT = 2;

export const classroomStudentStateOptions = [
    { value: CLASSROOM_STUDENT_STATE_PENDING, label: 'Chờ duyệt', color: 'warning' },
    { value: CLASSROOM_STUDENT_STATE_APPROVE, label: 'Đã duyệt', color: 'success' },
    { value: CLASSROOM_STUDENT_STATE_REJECT, label: 'Từ chối', color: 'error' },
];

export const syllabusKindOptions = [
    { value: LECTURE_SECTION, label: lectureKindMessage.chapter },
    { value: LECTURE_LESSION, label: lectureKindMessage.lesson },
];

export const DEVICE_KIND_DEVICE = 1;
export const DEVICE_KIND_BRAND = 2;

export const TYPE_ACTION_URL = 1;
export const TYPE_ACTION_CONTACT_FORM = 2;
export const typeActionOptions = [
    { value: TYPE_ACTION_URL, label: 'Mở đường dẫn' },
    { value: TYPE_ACTION_CONTACT_FORM, label: 'Biểu mẫu liên hệ' },
];