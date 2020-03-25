import {
  UserOutlined,
  HomeOutlined,
  LockOutlined,
  UnlockOutlined,
  BlockOutlined,
  ProfileOutlined,
  OrderedListOutlined,
  FundViewOutlined,
  UserAddOutlined
} from '@ant-design/icons';

const menu = {
  superAdmin: [{
    title: '首页',
    path: '/cma/home',
    icon: HomeOutlined,
    roleType:1,
  }, {
    title: '用户管理',
    path: '/cma/user',
    icon: UserOutlined,
    roleType:3,
    children: [{
      title: '用户列表',
      path: '/cma/user',
      icon: UserAddOutlined,
      roleType:3,
    }]
  }, {
    title: '权限管理',
    path: '/cma/right-manage',
    icon: LockOutlined,
    roleType:2,
    children: [{
      title: '角色列表',
      path: '/cma/right-manage/roles',
      icon: BlockOutlined,
      roleType:2,
    }, {
      title: '权限列表',
      path: '/cma/right-manage/right',
      icon: UnlockOutlined,
      roleType:2,
    }]
  }, {
    title: '文章管理',
    path: '/cma/article-manage',
    icon: ProfileOutlined,
    roleType:1,
    children: [{
      title: '文章列表',
      path: '/cma/article-manage/list',
      icon: OrderedListOutlined,
      roleType:1,
    },
    // {
    //   title: '文章分类',
    //   path: '/cma/article-manage/class',
    //   icon: FundViewOutlined,
    //   roleType:2,
    // }
  ]
  }],
  admin: [],
  writer: [{
    title: '首页',
    path: '/cma/home',
    icon: HomeOutlined,
  }, {
    title: '文章管理',
    path: '/cma/article-manage',
    icon: ProfileOutlined,
    children: [{
      title: '文章列表',
      path: '/cma/article-manage/list',
      icon: OrderedListOutlined
    }, {
      title: '文章分类',
      path: '/cma/article-manage/class',
      icon: FundViewOutlined
    }]
  }]
}
export default menu