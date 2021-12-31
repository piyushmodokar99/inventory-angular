export class Const 
{
    public static url = 'http://localhost:';
    public static port = '7000';
    public static baseUrl = Const.url + Const.port;    

    public static loginUrl = Const.baseUrl + '/login';

    public static productListUrl = Const.baseUrl + '/product/list';

    public static getProductUrl = Const.baseUrl + '/product/get-by-id';

    public static updateProductUrl = Const.baseUrl + '/product/update';

    public static addProductUrl = Const.baseUrl + '/product/add';

    public static getGraphUrl = Const.baseUrl + '/expences/graph-data';

    public static addExpenceUrl = Const.baseUrl + '/expences/add-exp';
}



