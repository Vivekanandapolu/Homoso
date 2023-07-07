import { environment } from "src/environments/environment"
const domain = environment.appurl

export const apiurls = {
    login: domain + 'auth/login',
    getUser: domain + 'auth/user',
    changePassword: domain + 'change_password',
    forgotPassword: domain + 'forgot_password',
    getComapnies: domain + 'comapanies/show',
    createCompany: domain + 'comapanies/create',
    editCompany: domain + 'companies/edit_companies/',
    getHostels: domain + 'hostels/comapnies_hostels',
    comapanyname: domain + 'hostels/companyname',
    createhostel: domain + 'hostels/create',
    editHostel: domain + 'hostels/edit_hostel/',
    createUser: domain + 'users/create',
    editUser: domain + 'users/edit_users/',
    getUsers: domain + 'users/show_user',
    getHosteluser: domain + 'users/show_hostel',
    settings: domain + '/Settings/',
    showSettings: domain + 'Settings/show',
    createRoomRates: domain + 'roomrates/create',
    getRoomrates: domain + 'roomrates/show',
    editRoomrates: domain + 'roomrates/edit/',
    createRoomTypes: domain + 'roomtypes/create',
    getRoomTypes: domain + 'roomrates/show',
    editRoomtypes: domain + 'roomrates/edit/',
    createCustomer: domain + 'customers/create',
    editCustomer: domain + 'customers/edit_customer/',
    createTenant: domain + 'tenants/create'
}