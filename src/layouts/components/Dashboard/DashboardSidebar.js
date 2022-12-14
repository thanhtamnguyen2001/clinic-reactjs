import React from 'react';
import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
// import IconDashboard from '~/components/Icon/IconDashboard';
import { NavLink } from 'react-router-dom';
import {
    IconDarkMode,
    IconDashboard,
    IconExamination,
    IconImage,
    IconList,
    IconLogOut,
    IconMedicine,
    IconPrescription,
    IconPrescriptionDetail,
    IconProfile,
    IconReceipt,
    IconRegulation,
    IconRole,
    IconUnitMedicine,
    IconUser,
} from '~/components/Icon';
import DashboardCertificate from '~/pages/ManagementPages/CertificatePage';
import DashboardMedicine from '~/pages/ManagementPages/MedicinePage';
import DashboardUser from '~/pages/ManagementPages/UserPage';
import { DashboardStats } from '~/pages/ManagementPages/StatsPage';

const cx = classNames.bind(styles);

export const sidebarLinks = [
    {
        icon: <IconDashboard></IconDashboard>,
        title: 'Thống kê',
        url: '/admin',
        content: (title) => {
            return <DashboardStats></DashboardStats>;
        },
    },
    {
        icon: <IconUser></IconUser>,
        title: 'Người dùng',
        url: '/admin/users',
        content: (title) => {
            return <DashboardUser nameBoard={title}></DashboardUser>;
        },
    },
    {
        icon: <IconMedicine></IconMedicine>,
        title: 'Thuốc',
        url: '/admin/medicines',
        content: (title) => {
            return <DashboardMedicine nameBoard={title}></DashboardMedicine>;
        },
    },
    {
        icon: <IconExamination></IconExamination>,
        title: 'Phiếu khám',
        url: '/admin/certificates',
        content: (title) => {
            return <DashboardCertificate nameBoard={title}></DashboardCertificate>;
        },
    },
    {
        icon: <IconPrescription></IconPrescription>,
        title: 'Toa thuốc',
        url: '/admin/prescriptions',
        content: (title) => {
            return <DashboardMedicine nameBoard={title}></DashboardMedicine>;
        },
    },
    {
        icon: <IconPrescriptionDetail></IconPrescriptionDetail>,
        title: 'Chi tiết toa thuốc',
        url: '/admin/prescription-details',
        content: (title) => {
            return <DashboardMedicine nameBoard={title}></DashboardMedicine>;
        },
    },
    {
        icon: <IconList></IconList>,
        title: 'Danh sách đăng ký khám',
        url: '/admin/registers',
        content: (title) => {
            return <DashboardMedicine nameBoard={title}></DashboardMedicine>;
        },
    },
    {
        icon: <IconRegulation></IconRegulation>,
        title: 'Quy định',
        url: '/admin/regulations',
        content: (title) => {
            return <DashboardMedicine nameBoard={title}></DashboardMedicine>;
        },
    },
    {
        icon: <IconReceipt></IconReceipt>,
        title: 'Hóa đơn',
        url: '/admin/receipts',
        content: (title) => {
            return <DashboardMedicine nameBoard={title}></DashboardMedicine>;
        },
    },
    {
        icon: <IconRole></IconRole>,
        title: 'Quyền',
        url: '/admin/roles',
        content: (title) => {
            return <DashboardMedicine nameBoard={title}></DashboardMedicine>;
        },
    },
    {
        icon: <IconImage></IconImage>,
        title: 'Ảnh hệ thống',
        url: '/admin/banners',
        content: (title) => {
            return <DashboardMedicine nameBoard={title}></DashboardMedicine>;
        },
    },
    {
        icon: <IconUnitMedicine></IconUnitMedicine>,
        title: 'Đơn vị',
        url: '/admin/units',
        content: (title) => {
            return <DashboardMedicine nameBoard={title}></DashboardMedicine>;
        },
    },
    {
        icon: <IconProfile></IconProfile>,
        title: 'Profile',
        url: '/admin/profile',
        content: (title) => {
            return <DashboardMedicine nameBoard={title}></DashboardMedicine>;
        },
    },
    {
        icon: <IconLogOut></IconLogOut>,
        title: 'Logout',
        url: '/ssign-in',
        content: (title) => {
            return <DashboardMedicine nameBoard={title}></DashboardMedicine>;
        },
        onclick: () => {},
    },
    {
        icon: <IconDarkMode></IconDarkMode>,
        title: null,
        url: '#',
        content: (title) => {
            return <DashboardMedicine nameBoard={title}></DashboardMedicine>;
        },
        onclick: () => {},
    },
];

const DashboardSidebar = () => {
    return (
        <div className={cx('sidebar-container')}>
            {sidebarLinks.map((link) => (
                <NavLink
                    to={link.url}
                    key={link.title}
                    className={({ isActive }) =>
                        isActive ? cx('sidebar-navlink') + ' ' + cx('sidebar-active') : cx('sidebar-navlink')
                    }
                >
                    <div>{link.icon}</div>
                    {link.title != null ? <div style={{ display: 'inline-block' }}>{link.title}</div> : ''}
                </NavLink>
            ))}
        </div>
    );
};

export default DashboardSidebar;
