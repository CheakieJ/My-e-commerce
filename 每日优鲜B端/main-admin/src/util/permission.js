/**
 * 设置每个角色对应的路由
 *
 */

const roleToRoute = {
  coustomer: [
    { name: "Product" },
    { name: "ProductList" },
    { name: "ProductAdd" },
    { name: "ProductEdit" },
  ],
  admin: [
    { name: "Product" },
    { name: "ProductList" },
    { name: "ProductAdd" },
    { name: "Category" },
    { name: "ProductEdit" },
  ],
};

//过滤没有权限的路由
/**
 * 通过所有的路由和当前角色对应的路由进行对比
 */
export default (role, routes) => {
  //获取当前角色对应的name
  const allowRoute = roleToRoute[role].map((item) => item.name);
  //获取当前角色对应的路由
  const resultRoute = routes.filter((r) => {
    if (allowRoute.indexOf(r.name) !== -1) {
      const children = r.children;
      r.children = children.filter((c) => {
        return allowRoute.indexOf(c.name) !== -1;
      });
      return true;
    }
    return false;
  });
  return resultRoute;
};
