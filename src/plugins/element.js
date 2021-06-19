import Vue from 'vue'
import {
  Button, Form, FormItem, Input, Message, Header, Aside, Main, Container, Submenu, MenuItem, Menu,
  Breadcrumb, BreadcrumbItem, Row, Col, Card, Table, TableColumn, Tooltip, Dialog, MessageBox, Collapse, CollapseItem,
  Select, Option, Cascader
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Container)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Menu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tooltip)
Vue.use(Dialog)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
