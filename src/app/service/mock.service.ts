import Mock from 'mockjs';
export default Mock.mock('http://localhost:4200/menu/getMenus', {
    'name': '@name',
    'age|1-100': 100,
    'color': '@color'
})